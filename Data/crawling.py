#pip install lxml

import requests
from bs4 import BeautifulSoup
from selenium.webdriver.common.keys import Keys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import time
import re
import csv


options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])


# csv저장
filename = "everytime_info_6.csv"
f = open(filename, "w", encoding="utf-8-sig", newline="")  # 엔터두번(자동줄바꿈) 없앰
writer = csv.writer(f)

title = "전공영역1	전공영역2	구분	학수번호-분반	교과목명	교수	시간	학점	담은 인원	정원	비고".split("\t")
writer.writerow(title)


browser = webdriver.Chrome(options=options)

# everytime 시간표로 이동
browser.get("https://everytime.kr/timetable")

idinput = browser.find_element(By.NAME, 'userid')
idinput.send_keys("{}") # input your everytime ID
passinput = browser.find_element(By.NAME, 'password')
passinput.send_keys("{}") # input your everytime password
loginbtn = browser.find_element(
    By.XPATH, '//*[@id="container"]/form/p[3]/input')
# robotcheck = browser.find_element(By.XPATH , '//*[@id="recaptcha-anchor"]/div[2]')
time.sleep(10)
loginbtn.click()

try:
    searchbtn = WebDriverWait(browser, 10).until(
        EC.presence_of_element_located((By.CLASS_NAME, "search"))
    )  # 입력창이 뜰 때까지 대기
finally:
    pass

searchbtn.click()
time.sleep(6)

# 전공,영역 클릭
browser.find_element(By.XPATH, '//*[@id="subjects"]/div[1]/a[3]').click()


# ===========================
soup = BeautifulSoup(browser.page_source, "lxml")
cate1 = soup.find_all("li", attrs={"class": "parent"})
print(len(cate1))

# 상위카테고리 선택
for cate1 in range(1, len(cate1)+1):
    if cate1 < 19:
        continue
    try:
        cate_first = WebDriverWait(browser, 10).until(
            EC.presence_of_element_located(
                (By.XPATH, '//*[@id="subjectCategoryFilter"]/div/ul/li[{}]'.format(cate1)))
        )  # 입력창이 뜰 때까지 대기
    finally:
        pass
    # 전공영역1 저장
    catetxt = cate_first.text
    # 소프트웨어 융합 대학 클릭
    cate_first.click()

    # 하위카테고리 li 갯수 확인
    soup = BeautifulSoup(browser.page_source, "lxml")
    child = soup.find("ul", attrs={"class": "unfolded"}).find_all(
        "li", attrs={"class": "child"})
    cate_len = len(child)

    # category-하위전공 선택(반복선택작업)
    for i in range(1, cate_len+1):
        major = browser.find_element(
            By.XPATH, '//*[@id="subjectCategoryFilter"]/div/ul/ul[{}]/li[{}]'.format(cate1, i)).text

        browser.find_element(
            By.XPATH, '//*[@id="subjectCategoryFilter"]/div/ul/ul[{}]/li[{}]'.format(cate1, i)).click()

        time.sleep(7)

        # page 갱신
        # soup = BeautifulSoup(browser.page_source, "lxml")

    # ======
        # div 속 스크롤 모두 내리기 ======
        itemlist = browser.find_element(By.CLASS_NAME, "list")

        # 스크롤을 화면 가장 아래로 내림
        #browser.execute_script("arguments[0].scrollBy(0, 500)", itemlist)
        # browser.execute_script("arguments[0].scrollIntoView(true);", itemlist);
        verical_ordinate = 100
        for i in range(0, 10):
            print(verical_ordinate)
            browser.execute_script(
                "arguments[0].scrollTop = arguments[1]", itemlist, verical_ordinate)
            verical_ordinate += 2500
            time.sleep(2)

        # div 속 스크롤 모두 내리기 끝======
        # page 재 갱신
        soup = BeautifulSoup(browser.page_source, "lxml")
    # ===

        listdiv = soup.find("div", attrs={"class": "list"})
        data_rows = listdiv.find("tbody").find_all("tr")

        for row in data_rows:
            columns = row.find_all("td")
            if len(columns) <= 1:  # 의미 없는 데이터는 skip
                continue
            data = [column.get_text().strip() for column in columns]
            data.insert(0, major)  # 전공2 라벨
            data.insert(0, catetxt)  # 전공1 라벨
            del data[-4]
            writer.writerow(data)
            print(data)
            print("-"*50)

        # 전공,영역 클릭
        browser.find_element(
            By.XPATH, '//*[@id="subjects"]/div[1]/a[3]').click()

    # ===========================

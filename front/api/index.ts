import { ADMIN_API_BASE_URL } from '@/constant';

export async function account_register(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/account-register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function account_show(email: string) {
  return fetch(`${ADMIN_API_BASE_URL}/account-show/${email}`, {
    method: 'GET',
  });
}

export async function admin_approved_tutoring_list() {
  return fetch(`${ADMIN_API_BASE_URL}/admin-approved-tutoring-list`, {
    method: 'GET',
  });
}

export async function admin_final_approve(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/admin-final-approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function admin_tutoring_approve(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/admin-tutoring-approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function admin_tutoring_return(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/admin-tutoring-return`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function admin_waiting_tutoring_list() {
  return fetch(`${ADMIN_API_BASE_URL}/admin-waiting-tutoring-list`, {
    method: 'GET',
  });
}

export async function admin_waiting_weekly_list() {
  return fetch(`${ADMIN_API_BASE_URL}/admin-waiting-weekly-list`, {
    method: 'GET',
  });
}

export async function admin_weekly_approve(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/admin-weekly-approve`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function admin_weekly_return(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/admin-weekly-return`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function all_student() {
  return fetch(`${ADMIN_API_BASE_URL}/all-student`, {
    method: 'GET',
  });
}

export async function get_files(tutoring_id: string, url: string) {
  return fetch(`${ADMIN_API_BASE_URL}/get_file/${tutoring_id}/${url}`, {
    method: 'GET',
  });
}

export async function get_made_tutoring(id: string) {
  return fetch(`${ADMIN_API_BASE_URL}/get-made-tutoring/${id}/`, {
    method: 'GET',
  });
}

export async function get_tutoring(id: string, course_number: string) {
  return fetch(`${ADMIN_API_BASE_URL}/get-tutoring-info/${id}/${course_number}/`, {
    method: 'GET',
  });
}

// 이미지 업로드
export async function image_load(data: FormData) {
  return fetch(`${ADMIN_API_BASE_URL}/image_load`, {
    method: 'POST',
    body: data,
  });
}

export async function image_update(tutoring_id: string, data: FormData) {
  return fetch(`${ADMIN_API_BASE_URL}/image_update/${tutoring_id}`, {
    method: 'POST',
    body: data,
  });
}

// 중간보고서 가져오기
export async function my_weekly(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/my-weekly`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function tutoring_apply(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/tutoring-apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function tutoring_out(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/tutoring-out`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export async function tutoring_propose(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/tutoring-propose`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

// 중간보고서 업로드
export async function weekly_upload(data: Object) {
  return fetch(`${ADMIN_API_BASE_URL}/weekly-upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

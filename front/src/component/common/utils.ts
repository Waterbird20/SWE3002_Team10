import { Dispatch, SetStateAction } from 'react';

export const uploadFile = async (endpoint: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`https://your-backend-server.com/api/${endpoint}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error uploading file');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw error;
  }
};

export const removeUploadedFile = async (endpoint: string, fileName: string) => {
  try {
    const response = await fetch(`https://your-backend-server.com/api/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify({ fileName }),
    });

    if (!response.ok) {
      throw new Error('Error removing file');
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    throw error;
  }
};

export const handleFileSubmitFactory =
  (endpoint: string, uploadedFile: File | null, setPending: Dispatch<SetStateAction<boolean>>, toast: any) =>
  async () => {
    setPending(true);
    if (uploadedFile) {
      try {
        await uploadFile(endpoint, uploadedFile);
        toast({
          title: '파일이 업로드되었습니다.',
          status: 'success',
        });
      } catch (e: any) {
        toast({
          title: '파일 업로드에 실패했습니다.',
          status: 'error',
        });
      }
    } else {
      toast({
        title: '파일을 선택해주세요.',
        status: 'error',
      });
    }
    setPending(false);
  };

export const handleFileRemoveFactory =
  (endpoint: string, fileName: string, setPending: Dispatch<SetStateAction<boolean>>, toast: any) => async () => {
    setPending(true);
    try {
      await removeUploadedFile(endpoint, fileName);
      toast({
        title: '파일이 삭제되었습니다.',
        status: 'success',
      });
    } catch (e: any) {
      toast({
        title: '파일 삭제에 실패했습니다.',
        status: 'error',
      });
    }
    setPending(false);
  };

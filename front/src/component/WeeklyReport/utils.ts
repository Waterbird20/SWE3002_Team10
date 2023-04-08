export const submitFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('https://your-backend-server.com/api/weekly_report', {
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

export const removeFile = async (fileName: string) => {
  try {
    const response = await fetch('https://your-backend-server.com/api/weekly_report', {
      method: 'POST',
      body: JSON.stringify({ fileName }),
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

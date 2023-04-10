
  import fetch from '@src/utils/FetchInterceptor';
  
  const api = 'filemanager';

export const uploadFiles = async (data: FormData) => {
  const response = await  fetch({
    url: `${api}/upload-files`,
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    return response.data as {
      original: string;
    }[];
  };
  
 
import { Text } from '@chakra-ui/react';
import { get_files } from '../../../api';

export const ImageUrlText = ({ url, tutoring_id }: { url: string; tutoring_id: string }) => {
  const splitArr = url.split('/');

  return (
    <Text
      fontSize="xs"
      onClick={async () => {
        const res = await get_files(tutoring_id, 'credential_url');
        if (!res.body) return;
        const reader = res.body.getReader();

        const stream = new ReadableStream({
          async start(controller) {
            while (true) {
              const { done, value } = await reader.read();

              if (done) {
                controller.close();
                break;
              }
              controller.enqueue(value);
            }
          },
        });

        const newResponse = new Response(stream);
        const blob = await newResponse.blob();
        const url = URL.createObjectURL(blob);

        const downloadLink = document.createElement('a');
        downloadLink.download = url;
        downloadLink.href = url;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }}
    >
      {splitArr[splitArr.length - 1]}
    </Text>
  );
};

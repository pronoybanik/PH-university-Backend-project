import { v2 as cloudinary } from 'cloudinary';

export const sendImageToCloudinary = () => {
  cloudinary.config({
    cloud_name: 'dvcbclqid',
    api_key: '566461134898943',
    api_secret: '<your_api_secret>', // Click 'View API Keys' above to copy your API secret
  });

  cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    {
      public_id: 'shoes',
    },
    function (error, result) {
      console.log('result', result);
    },
  );
};

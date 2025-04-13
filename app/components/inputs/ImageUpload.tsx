import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = 'anupriya';

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const handleUploadSuccess = useCallback(
    (result: any) => {
      console.log('Upload result:', result);
      if (result && result.info) {
        onChange(result.info.secure_url);
      } else {
        console.error('Upload failed: No result or info');
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUploadSuccess} // Use the new prop name here
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => (
        <div
          onClick={() => open()}
          className="
            relative
            cursor-pointer
            hover:opacity-70
            transition
            border-dashed 
            border-2 
            p-20 
            border-neutral-300
            flex
            flex-col
            justify-center
            items-center
            gap-4
            text-neutral-600
          "
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload</div>
          {value ? (
            <div className="absolute inset-0 w-full h-full">
              <Image
                fill
                style={{ objectFit: 'cover' }}
                src={value}
                alt="Uploaded Image"
              />
            </div>
          ) : (
            <div>No image uploaded</div>
          )}
        </div>
      )}
    </CldUploadWidget>
  );
};

export default ImageUpload;

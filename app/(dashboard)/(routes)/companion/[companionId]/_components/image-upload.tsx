"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";

type ImageUploadProps = {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
};

export const ImageUpload: FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return false;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center space-y-4">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={(result: any) => onChange(result.info.secure_url)}
        uploadPreset="kth8nxsz"
      >
        <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border-4 border-dashed border-primary/10 p-4 transition hover:opacity-75">
          <div className="relative h-40 w-40">
            <Image
              fill
              alt="Upload"
              src={value || "/images/placeholder.svg"}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

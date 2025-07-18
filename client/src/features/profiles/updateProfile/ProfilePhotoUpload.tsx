import { useRef } from 'react';
import { ArrowUp, Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useCurrentUser } from '@/api/apiAuth';
import { useUploadProfilePhoto } from '@/api/apiProfiles';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ProfilePhotoUploadProps {
  value?: string;
  onChange: (value: string) => void;
  displayName?: string;
}

export const ProfilePhotoUpload = ({
  value,
  onChange,
  displayName,
}: ProfilePhotoUploadProps) => {
  const { currentUser } = useCurrentUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadProfilePhoto, isPending } = useUploadProfilePhoto();

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const photo = await uploadProfilePhoto(file, {
          onSuccess: () => {
            toast.success('Profile photo uploaded successfully');
          },
        });
        onChange(photo.url);
      } catch (error) {
        console.error('Failed to upload photo:', error);
      }
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const imageUrl = currentUser?.imageUrl || value || '/avatar_fallback.png';

  return (
    <div className='relative cursor-pointer' onClick={handleAvatarClick}>
      <Avatar className='size-28'>
        <AvatarImage
          src={imageUrl}
          alt={`Profile picture of ${displayName || 'user'}`}
        />
      </Avatar>
      <div className='absolute bottom-0 right-0 border-2 bg-black hover:bg-pink-700 rounded-full p-1.5 transition-colors duration-200'>
        {isPending ? (
          <Loader2Icon className='animate-spin text-white' />
        ) : (
          <ArrowUp size={22} className='text-white' />
        )}
      </div>

      <input
        type='file'
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        onChange={handlePhotoUpload}
      />
    </div>
  );
};

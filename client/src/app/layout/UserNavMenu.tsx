import { useCurrentUser, useLogout } from '@/api/apiAuth';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router';

export const UserNavMenu = () => {
  const navigate = useNavigate();

  const { currentUser } = useCurrentUser();
  const { logout } = useLogout();
  const userInitials = currentUser?.displayName?.charAt(0) || '';

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  console.log('currentUser', currentUser);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <div className='size-8 bg-muted flex items-center justify-center rounded-full text-sm font-semibold text-muted-foreground'>
            <Avatar className='size-8'>
              <AvatarImage
                src={currentUser?.imageUrl ?? './avatar_fallback.avif'}
                alt={currentUser?.displayName}
              />
              <AvatarFallback className='text-sm'>
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuLabel>
          <div className='flex gap-3 items-center'>
            {currentUser?.imageUrl ? (
              <div className='size-10 rounded-full overflow-hidden'>
                <img
                  src={currentUser.imageUrl}
                  alt={`Profile picture of ${currentUser.displayName}`}
                />
              </div>
            ) : (
              <div className='size-10 bg-muted rounded-full'></div>
            )}
            <div>
              <p className='font-semibold'>{currentUser?.displayName}</p>
              <p className='text-muted-foreground'>{currentUser?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>View profile</DropdownMenuItem>

          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

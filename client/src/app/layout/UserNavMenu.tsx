import { useCurrentUser, useLogout } from '@/api/apiAuth';
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

export const UserNavMenu = () => {
  const { currentUser } = useCurrentUser();
  const { logout } = useLogout();
  const userInitials = currentUser?.displayName?.charAt(0) || '';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon'>
          <div className='size-8 bg-muted flex items-center justify-center rounded-full text-sm font-semibold text-muted-foreground'>
            <p>{userInitials}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='start'>
        <DropdownMenuLabel>
          <div className='flex gap-3 items-center'>
            {currentUser?.imageUrl ? (
              <div>
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
          <DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

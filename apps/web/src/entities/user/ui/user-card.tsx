import { Avatar, AvatarFallback, AvatarImage, Badge, Card, CardContent } from '@hub/ui'

import type { User } from '@entities/user/model/types'

interface UserCardProps {
  user: User
  onClick?: () => void
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card
      className={onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
      onClick={onClick}
    >
      <CardContent className="flex items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={user.profileImage} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{user.name}</p>
          <p className="text-sm text-muted-foreground truncate">{user.position}</p>
          <p className="text-xs text-muted-foreground truncate">{user.department}</p>
        </div>
        {user.role === 'admin' && <Badge variant="secondary">관리자</Badge>}
      </CardContent>
    </Card>
  )
}

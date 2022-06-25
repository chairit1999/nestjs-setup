import { Expose } from 'class-transformer';
import { ENUMUserGroup } from 'src/share/enum-group/user.enum';
import { Column, Entity, Generated, OneToMany } from 'typeorm';
import { ExtendedEntity } from '../extended-entity';
export const GroupViewUser = 'group_view_user';
export const GroupViewUnit = 'group_view_unit';
export const GroupViewUnitUser = 'group_view_unit_user';

@Entity('user')
export class UserEntity extends ExtendedEntity {
  @Column()
  @Generated('uuid')
  uuid: string;

  @Expose({ groups: [ENUMUserGroup.CREATEUSERGROUP] })
  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Expose({ groups: [ENUMUserGroup.CREATEUSERGROUP] })
  @Column({ type: 'varchar', length: 100 })
  userName: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Expose({ groups: [ENUMUserGroup.CREATEUSERGROUP] })
  @Column({ type: 'varchar', length: 100 })
  name: string;
}

import { Expose } from 'class-transformer';
import { ENUMEntity } from 'src/share/enum/entity.enum';
import { ENUMUserGroup } from 'src/share/enum/user-group.enum';
import { Column, Entity, Generated } from 'typeorm';
import { ExtendedEntity } from '../extended-entity';

@Entity(ENUMEntity.USER)
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

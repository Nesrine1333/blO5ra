// bl.entity.ts
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity({name: 'bl'})
export class Bl {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;

  //reference men win tji ?

    @Column()
    dateBl: Date;

    @Column()
    matriculeFiscale:string;

  //Destinaraire
 

    @Column()
    Mob:string  ;

    
    @Column()
    Fixe:string  ;

    @Column()
    address:String;

    @Column()
    colisLivre:number;

    @Column()
    colisRetour:number;

    //Colis

    @Column()
    colisechange: number;

   /* @Column()
    prixLiv: number;//besh nzidu 3lih tva //shnuwa el fonction mta3 tva= 8.00=fraislivra*/

    @Column()
    COD: number //cr_bt 
    @Column()
    reference:string;

    @ManyToOne(()=> User,(user)=> user.bonDeLiv)
    @JoinColumn({ name: 'userId'  })
    user: User


}

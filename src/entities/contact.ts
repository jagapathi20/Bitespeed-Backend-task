import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm'

@Entity('contact')
export class Contact{
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({type: 'varchar', length:10, nullable: true})
    PhoneNumber!: string | null;

    @Column({type: 'varchar', length:255, nullable: true})
    email!: string | null;

    @Column({type: "int", nullable: true})
    linkedId!: number | null;

    @Column({type: "varchar", default: "primary"})
    linkPrecedence!: "primary" | "secondary";

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @DeleteDateColumn()
    deletedAt!: Date | null

    @ManyToOne(() => Contact, (contact) => contact.secondaryContacts)
    @JoinColumn({ name: "linkedId" })
    linkedContact!: Contact | null;

    @OneToMany(() => Contact, (contact) => contact.linkedContact)
    secondaryContacts!: Contact[];
}
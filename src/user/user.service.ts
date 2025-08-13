import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    findAll(): Observable<User[]> {
        return from(this.userRepository.find());
    }

    findById(id: number): Observable<User | null> {
        return from(this.userRepository.findOneBy({ id }));
    }

    create(user: User): Observable<User> {
        return from(this.userRepository.save(user));
    }

    update(id: number, partialUser: Partial<User>): Observable<User | null> {
        return from(this.userRepository.update(id, partialUser)).pipe(
            switchMap(result => {
                if (result.affected && result.affected > 0) {
                    return this.findById(id);
                }
                return of(null);
            })
        );
}

    delete(id: number): Observable<void> {
        return from(this.userRepository.delete(id)).pipe(
            map(() => {})
        );
    }
}

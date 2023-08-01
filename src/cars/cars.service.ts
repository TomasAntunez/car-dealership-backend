import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Car } from './interfaces';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {

  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla'
    // }
  ];


  findAll() {
    return this.cars;
  }


  findOneById( id: string ) {
    const car = this.cars.find( car => car.id === id );
    if (!car) throw new NotFoundException(`Car with id ${ id } not found`);

    return car;
  }


  create( createCarDto: CreateCarDto ) {
    const car: Car = {
      id: uuid(),
      ...createCarDto
    }

    this.cars.push( car );

    return car;
  }


  update( id: string, updateCarDto: UpdateCarDto ) {

    let persistedCar = this.findOneById( id );

    if ( updateCarDto.id && updateCarDto.id !== id ) {
      throw new BadRequestException('Car id is not valid inside body');
    }

    this.cars = this.cars.map( car => {

      if ( car.id === id ) {
        persistedCar = { ...persistedCar, ...updateCarDto, id };
        return persistedCar;
      }

      return car;
    });

    return persistedCar;
  }


  delete( id: string ) {
    this.findOneById( id );
    this.cars = this.cars.filter( car => car.id !== id );
  }

}

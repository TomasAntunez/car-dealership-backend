import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { Brand } from './entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from './dto';


@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    // {
    //   id: uuid(),
    //   name: 'Toyota',
    //   createdAt: new Date().getTime()
    // }
  ];


  create(createBrandDto: CreateBrandDto) {

    const { name } = createBrandDto;

    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      createdAt: new Date().getTime()
    }

    this.brands.push(brand);

    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find( brand => brand.id === id );
    if (!brand) throw new NotFoundException(`Brand with id "${ id }" not found`);

    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    
    let persistedBrand = this.findOne( id );

    this.brands = this.brands.map( brand => {

      if ( brand.id === id ) {
        persistedBrand.updatedAt = new Date().getTime();
        persistedBrand = { ...brand, ...updateBrandDto, id };
        return persistedBrand;
      }

      return brand;
    });

    return persistedBrand;
  }

  remove(id: string) {
    this.brands = this.brands.filter( brand => brand.id !== id );
  }


  fillDataBaseWithSeedData( brands: Brand[] ) {
    this.brands = brands;
  }

}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiCreatedResponse({
    description: 'Product has been successfully created.',
  })
  @ApiConflictResponse({
    description: 'Product already exists.',
  })
  @ApiBadRequestResponse({
    description: 'Bad request in Product data.',
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOkResponse({ description: 'Products list' })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @ApiOkResponse({ description: 'Product by id' })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @ApiOkResponse({ description: 'Products by category id' })
  @ApiNotFoundResponse({ description: 'Products with category id not found' })
  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.productsService.findByCategory(id);
  }

  @ApiOkResponse({ description: 'Products by subcategories ids' })
  @ApiNotFoundResponse({
    description: 'Products with subcategory id not found',
  })
  @Get('subcategories/:id')
  findBySubCategory(@Param('id') id: string) {
    return this.productsService.findBySubCategory(id);
  }
  /*
  findBySubCategory(@Body() id: string[]) {
    return this.productsService.findBySubCategory(id);
  }*/

  @ApiOkResponse({ description: 'Product successfully updated' })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOkResponse({ description: 'Product successfully deleted' })
  @ApiNotFoundResponse({ description: 'Product id not found' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}

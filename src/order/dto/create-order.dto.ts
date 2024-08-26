import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty({ message: "User ID is required" })
    @IsNumber({}, { message: "User ID must be a number" })
    userId: number;

    @IsNotEmpty({ message: "Product ID is required" })
    @IsNumber({}, { message: "Product ID must be a number" })
    productId: number;

    @IsNotEmpty({ message: "Quantity of products is required" })
    @IsNumber({}, { message: "Quantity must be a number" })
    quantity: number;
}

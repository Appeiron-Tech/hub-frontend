import type { IProduct, IProductImage } from "@/views/products/models/IProduct";
import ProductService from "@/views/products/service/Product.services";
import { reactive } from "vue";

class ProductController {
  private _m_allProducts: Array<IProduct> = [];
  private _m_productService: ProductService = new ProductService();

  constructor() {}

  get AllProducts(): Array<IProduct> {
    return this._m_allProducts;
  }

  set AllProducts(value: Array<IProduct>) {
    this._m_allProducts = value;
  }

  loadProducts() {
    this._m_allProducts = this._m_productService.getAllProducts();
  }

  deleteProduct(productId: number) {
    this._m_productService.deleteSpecificProduct(productId);
  }

  addNewProductTemplate() {
    this._m_allProducts.push({
      name: "",
      price: 0,
      isActive: true,
      id: 4,
      description: "",
      sku: 0,
      images: [{ src: "", name: "" }],
    });
  }

  removeSpeficiImageProduct(productId: number, image: IProductImage) {
    const imagePos = this._m_allProducts
      .find((e) => e.id == productId)
      ?.images?.findIndex((e) => e.name == image.name);
    this._m_productService.deleteImageFromProduct(productId, imagePos!);

    const productIndex = this._m_allProducts.findIndex(
      (e) => e.id === productId
    );
    this._m_allProducts[productIndex].images = this._m_allProducts[
      productIndex
    ].images?.filter((e) => e.name != image.name);
  }
}

const productController = reactive(new ProductController());
export default productController;

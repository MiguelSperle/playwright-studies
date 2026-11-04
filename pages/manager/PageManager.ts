import { Page } from "@playwright/test";
import { AuthenticationPage } from '../authentication-page';
import { InventoryPage } from '../inventory-page';
import { ProductDetailsPage } from '../product-details-page';

export class PageManager {
    private readonly authenticationPage: AuthenticationPage;
    private readonly inventoryPage: InventoryPage;
    private readonly productDetailsPage: ProductDetailsPage;

    constructor(private readonly page: Page) {
        this.authenticationPage = new AuthenticationPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
        this.productDetailsPage = new ProductDetailsPage(this.page);
    }

    onAuthenticationPage(): AuthenticationPage {
        return this.authenticationPage;
    }

    onInventoryPage(): InventoryPage {
        return this.inventoryPage;
    }

    onProductDetailsPage(): ProductDetailsPage {
        return this.productDetailsPage;
    }
}
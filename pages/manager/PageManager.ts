import { Page } from "@playwright/test";
import { AuthenticationPage } from '../authentication-page';
import { InventoryPage } from '../inventory-page';

export class PageManager {
    private readonly authenticationPage: AuthenticationPage;
    private readonly inventoryPage: InventoryPage;

    constructor(private readonly page: Page) {
        this.authenticationPage = new AuthenticationPage(this.page);
        this.inventoryPage = new InventoryPage(this.page);
    }

    onAuthenticationPage(): AuthenticationPage {
        return this.authenticationPage;
    }

    onInventoryPage(): InventoryPage {
        return this.inventoryPage;
    }
}
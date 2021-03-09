import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
    base: 'light',
    brandTitle: 'Receipts Scanner',
    brandUrl: 'https://github.com/petr7555/bachelors_thesis_accounting_ocr',
    brandImage:
        'https://storage.googleapis.com/images_bachelorsthesisaccountingocr/receipt-icon.png',
});

addons.setConfig({
    theme,
});

// TODO: Move/merge with product util in peregrine?

export const isProductConfigurable = product =>
    product.__typename === 'ConfigurableProduct' || 'DownloadableProduct';

export const productOptionsType = product => {
    if(product.__typename === 'ConfigurableProduct') return product.configurable_options
    else return product.options
}

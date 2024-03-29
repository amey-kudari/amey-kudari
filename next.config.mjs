/** @type {import('next').NextConfig} */
// const nextConfig = {};

import path from 'path';
// const path = require("path")

const IMAGE_INLINE_SIZE_LIMIT = parseInt(
    process.env.IMAGE_INLINE_SIZE_LIMIT || '10240'
);


const NEXT_IMAGE_LOADER_EXCLUDE = ['toast5'].map((module) => {
    return path.resolve(`./node_modules/${module}`);
})

const nextConfig = {
    webpack(config) {
        const nextImageLoaderIndex = config.module.rules.findIndex(item => item.loader === "next-image-loader");
        const { loader, options, ...ruleProps } = config.module.rules[nextImageLoaderIndex];

        config.module.rules[nextImageLoaderIndex] = {
            ...ruleProps,
            oneOf: [
                {
                    exclude: NEXT_IMAGE_LOADER_EXCLUDE,
                    loader,
                    options,
                },
                {
                    type: 'asset',
                    parser: {
                        dataUrlCondition: {
                            maxSize: IMAGE_INLINE_SIZE_LIMIT,
                        },
                    },
                }
            ]
        };
        return config
    }
}

export default nextConfig;

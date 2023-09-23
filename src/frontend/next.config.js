/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
      serverActions:true   
    },
    images: {
        remotePatterns:[
            {
                protocol:"https",
                hostname: "**",
            },
            {
                protocol:"http",
                hostname: "**",
            }
        ]
    },
    output: "standalone"
}

module.exports = nextConfig

import {Cloudinary} from '@cloudinary/url-gen'

export const cld = new Cloudinary ({
    cloud:{
        cloudName:process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        apiKey:process.env.CLOUD_API_KEY!,
        apiSecret:process.env.CLOUD_SECRET_KEY
    }
})

export const cloudinaryBaseUrl =  `https://res.cloudinary.com/${
    cld.getConfig().cloud!.cloudName
  }`;
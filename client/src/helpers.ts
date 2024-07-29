export const formatNumberCurrency = (q: any) => {
    return q.toLocaleString('en-CA', {
        style: 'currency',
        currency: 'CAD',
        maximumFractionDigits: 0
    })
} 

export const formatNumberCurrencyShort = (q: any) => {
  let num = parseFloat(q);
  let suffix = '';
  
  if (num >= 1e9) {
      num = num / 1e9;
      suffix = 'B';
  } else if (num >= 1e6) {
      num = num / 1e6;
      suffix = 'M';
  } else if (num >= 1e3) {
      num = num / 1e3;
      suffix = 'K';
  }

  const formattedNumber = num.toLocaleString('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
  });

  return formattedNumber.replace('CA$', 'CAD$') + suffix;
};


export const formatNumber = (q: any) => {
    return q.toLocaleString('en-CA', { maximumFractionDigits: 2 })
} 

export const formatNumberNoDecimal = (q: any) => {
  return q.toLocaleString('en-CA', { maximumFractionDigits: 0 })
} 

export const statusServiceMapping: { [key: string]: { [key: string]: string } } = {
    Active: {
      Listing: 'For Sale',
      Tender: 'For Sale by Tender',
      Auction: 'For Sale by Auction',
      Lease: 'For Lease',
      Wanted: 'Active Buyer Contract',
    },
    Pending: {
      Listing: 'Sale Pending',
      Lease: 'Lease Pending',
      Wanted: 'Pending Buyer Contract',
    },
    'Sold/Leased': {
      Listing: 'Sold',
      Lease: 'Leased',
      Wanted: 'Fulfilled Buyer Contract',
    },
  };

export const getStatusText = (listingStatus: string, serviceType: string): string => {
    const serviceMapping = statusServiceMapping[listingStatus];
    return serviceMapping?.[serviceType] || 'N/A';
  };

export const timeAgo = (date: Date): string => {
    const now = new Date();
    const time = new Date(date).getTime()
    const secondsPast = Math.floor((now.getTime() - time) / 1000);
  
    if (secondsPast < 60) {
      return `${secondsPast} seconds ago`;
    }
    if (secondsPast < 3600) {
      const minutes = Math.floor(secondsPast / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    if (secondsPast < 86400) {
      const hours = Math.floor(secondsPast / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (secondsPast < 604800) {
      const days = Math.floor(secondsPast / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    if (secondsPast < 2592000) {
      const weeks = Math.floor(secondsPast / 604800);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    }
    if (secondsPast < 31536000) {
      const months = Math.floor(secondsPast / 2592000);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
    
    const years = Math.floor(secondsPast / 31536000);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
  }

export const placeholderImageUrl = "https://ag-mls-content-bucket.s3.ca-central-1.amazonaws.com/1717090534373-original%20%281%29.jpg";

export const svgIcon = (color: string): string => {
    return '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 21.0001 21.0001" xmlns="http://www.w3.org/2000/svg" id="fi_14090313"><g id="图层_x0020_1"><path d="m0 0h21v21h-21z" fill="none"></path><path d="m10.5 1.31566c4.00193 0 7.24635 3.24419 7.24635 7.24612 0 3.07158-4.26833 8.37025-6.25329 10.6681-.25811.29896-.59807.45444-.99306.45444s-.73495-.15549-.99306-.45444c-1.98496-2.29787-6.25329-7.59654-6.25329-10.6681 0-4.00193 3.24442-7.24612 7.24635-7.24612zm0 4.36723c1.51734 0 2.74781 1.23047 2.74781 2.74797 0 1.51726-1.23047 2.74766-2.74781 2.74766s-2.74781-1.2304-2.74781-2.74766c0-1.5175 1.23047-2.74797 2.74781-2.74797z" fill="' + color + '"></path></g></svg>';
};
  
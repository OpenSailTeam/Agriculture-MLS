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
  return '<svg clip-rule="evenodd" fill-rule="evenodd" image-rendering="optimizeQuality" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 21.0001 21.0001" xmlns="http://www.w3.org/2000/svg" id="fi_14090313"><g class="layer"><title>Layer 1</title><g id="图层_x0020_1"><path d="m10.5,1.32c4,0 7.25,3.24 7.25,7.24c0,3.07 -4.27,8.37 -6.26,10.67c-0.26,0.3 -0.6,0.45 -0.99,0.45s-0.73,-0.15 -0.99,-0.45c-1.99,-2.3 -6.26,-7.6 -6.26,-10.67c0,-4 3.25,-7.24 7.25,-7.24z" fill="#ffffff" id="svg_8"/><path d="m0,0l21,0l0,21l-21,0l0,-21z" fill="none" id="svg_1" transform="matrix(1 0 0 1 0 0)"/><path d="m10.5,1.32c4,0 7.25,3.24 7.25,7.24c0,3.07 -4.27,8.37 -6.26,10.67c-0.26,0.3 -0.6,0.45 -0.99,0.45s-0.73,-0.15 -0.99,-0.45c-1.99,-2.3 -6.26,-7.6 -6.26,-10.67c0,-4 3.25,-7.24 7.25,-7.24zm0,4.36c1.52,0 2.75,1.23 2.75,2.75c0,1.52 -1.23,2.75 -2.75,2.75s-2.75,-1.23 -2.75,-2.75c0,-1.52 1.23,-2.75 2.75,-2.75z" fill="' + color + '" id="svg_2"/></g></g></svg>';
};
  
// Utility functions to generate deeplinks for ride-hailing apps

export const generateUberDeeplink = (pickup, dropoff) => {
    const uberAppLink = `uber://?action=setPickup&pickup[formatted_address]=${encodeURIComponent(pickup.name)}&dropoff[formatted_address]=${encodeURIComponent(dropoff.name)}`;
    const uberWebLink = `https://m.uber.com/ul/?pickup=${encodeURIComponent(pickup.name)}&dropoff=${encodeURIComponent(dropoff.name)}`;
    
    return {
        appLink: uberAppLink,
        webLink: uberWebLink
    };
};

export const generateOlaDeeplink = (pickup, dropoff) => {
    // Ola deeplink format
    const olaAppLink = `ola://booking?pickup=${encodeURIComponent(pickup.name)}&drop=${encodeURIComponent(dropoff.name)}`;
    const olaWebLink = `https://book.olacabs.com/?pickup=${encodeURIComponent(pickup.name)}&drop=${encodeURIComponent(dropoff.name)}`;
    
    return {
        appLink: olaAppLink,
        webLink: olaWebLink
    };
};

export const generateRapidoDeeplink = (pickup, dropoff) => {
    // Rapido deeplink format
    const rapidoAppLink = `rapido://book?pickup=${encodeURIComponent(pickup.name)}&drop=${encodeURIComponent(dropoff.name)}`;
    const rapidoWebLink = `https://onlineapp.rapido.bike/book?pickup=${encodeURIComponent(pickup.name)}&drop=${encodeURIComponent(dropoff.name)}`;
    
    return {
        appLink: rapidoAppLink,
        webLink: rapidoWebLink
    };
};

export const openDeeplink = (appLink, webLink) => {
    // Try to open the app first
    window.location.href = appLink;
    
    // Set a timeout to redirect to web version if app doesn't open
    setTimeout(() => {
        window.location.href = webLink;
    }, 2000);
}; 
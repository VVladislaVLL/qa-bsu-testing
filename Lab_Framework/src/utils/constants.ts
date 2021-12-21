export enum Browser {
    Chrome = 'chrome',
    FireFox = 'firefox'
}

export const flags = [
    '--headless',
    '--no-sandbox',
    '--incognito',
    '--disk-cache-size=0',
    '--disable-dev-shm-usage',
    '--window-size=1920,1080',
    '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
]

// export const flags = [];
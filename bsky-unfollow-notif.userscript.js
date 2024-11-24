// ==UserScript==
// @name         Bluesky Unfollow Notification
// @namespace    http://tampermonkey.net/
// @version      2024-11-23
// @description  Shows You Unfollow Notifications
// @author       You
// @match        https://bsky.app/*
// @match        https://bsky.social/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bsky.app
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function escapeAttribute(str) {
        return escapeHTML(str).replace(/`/g, "&#96;").replace(/\\/g, "&#92;");
    }

    function generateHTML(displayName, handle, profileAvatar, date) {
        const escapedDisplayName = escapeHTML(displayName);
        const escapedHandle = escapeAttribute(handle);
        const escapedDate = escapeHTML(formatDate(date));
        const escapedAvatarUrl = escapeAttribute(profileAvatar);
        const escapedTimeAgo = escapeHTML(timeAgo(date));

        const notificationHTML = `
            <div class="css-175oi2r">
            <div>
                <div aria-label="${escapedDisplayName} unfollowed you · ${escapedDate}" role="link" tabindex="0" class="css-175oi2r r-1loqt21 r-1otgn73" data-testid="feedItem-by-${escapedHandle}">
                    <div class="css-175oi2r r-18u37iz r-1sp51qo r-ry3cjt" style="border-color: rgb(37, 51, 66); border-top-width: 0px; overflow: hidden;">
                        <div class="css-175oi2r r-1p0dtai r-1d2f490 r-633pao r-u8s1d r-zchlnj r-ipm5af r-1eb9tut" style="background-color: rgb(20, 27, 35); opacity: 0;"></div>
                        <div class="css-175oi2r r-obd0qt r-vmopo1 r-cfp7ip" style="padding-right: 8px;"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 500 500"><path d="m239.4883 249.7969 2.3542-.0213c2.49-.0174 4.9799-.0238 7.47-.0256l2.5797-.002c12.6025.0158 24.7773.4234 37.1078 3.252l2.3228.504c35.994 7.961 74.264 28.6378 95.6772 59.496v1l-3.2197-.0159a3677.061 3677.061 0 0 0-30.269-.0074c-5.1855.0185-10.3702.0227-15.5557-.0075-5.0191-.0286-10.0368-.0174-15.0558.0196a381.8218 381.8218 0 0 1-5.6994-.0198c-18.2176-.1846-32.5645 4.63-46.2004 17.031l-1.871 1.3438C259.861 339.114 253.8066 352.99 252 364c-1.7664 20.089 1.5855 36.9936 14.8125 52.8125C278.4795 429.2199 293.5603 434.3775 310 437v1c-28.5463.07-57.0925.123-85.6388.1554-13.2546.0155-26.509.0366-39.7635.071-11.5526.0298-23.1051.0492-34.6577.0559-6.1171.0039-12.234.013-18.351.0349-5.7587.0204-11.5172.0266-17.2758.0221-2.1123.0008-4.2247.0068-6.337.0183-2.8875.015-5.7745.0113-8.6621.0032l-2.5234.0264c-6.7693-.0516-12.3432-1.266-17.6032-5.8247-5.1381-6.019-7.257-10.9985-7.1563-19.064.2281-2.5845.568-5.1226.9688-7.686l.425-2.8589C79.2222 366.4344 94.497 331.9916 120 305a734.6559 734.6559 0 0 0 3.4375-4.0625c27.8254-31.6112 74.2589-50.886 116.0508-51.1406ZM309.125 61.5625C328.036 77.5957 341.2682 99.053 344 124c1.3846 27.432-4.106 53.0178-23 74-18.4385 19.9612-40.6121 29.9557-67.6563 32.2227-24.652.875-49.2727-8.6813-67.3437-25.2227l-2.4297-2.2188c-16.2693-15.5572-26.9719-38.7138-27.9062-61.2539C155.393 124.6033 157.4777 109.3296 165 94c.4525-.932.905-1.864 1.371-2.8242 11.6941-22.7226 31.9443-38.4222 55.9415-46.3633 29.9337-8.7498 62.3308-2.5228 86.8125 16.75Z" fill="hsl(0, 99%, 53%)"/><path d="m312.7105 353.7326 3.4535-.0259 3.761.0028 3.983-.0204c3.5993-.0176 7.1985-.0223 10.7979-.0236 2.2512-.0014 4.5025-.0057 6.7537-.011a9237.8066 9237.8066 0 0 1 23.5836-.0251c7.3158.0012 14.6314-.0199 21.9471-.0515a4321.2864 4321.2864 0 0 1 18.8719-.0356c3.7528.0005 7.5054-.0051 11.2581-.0264 4.189-.023 8.3774-.0138 12.5665-.0017l3.7426-.0341c7.9131.0578 13.3884.9836 19.594 6.2308 4.3937 5.4096 6.4747 10.0352 6.2149 17.2149-.8232 7.1656-3.7067 11.075-9.2031 15.6289-3.9804 2.8267-6.745 3.6962-11.6634 3.7127l-3.4748.0259-3.8003-.0028c-1.3374.006-2.6747.0128-4.012.0204-3.6304.0176-7.2607.0223-10.8911.0236-2.2702.0014-4.5404.0057-6.8105.011-7.926.0185-15.852.0267-23.7781.0251-7.3777-.0012-14.7552.0199-22.1328.0515-6.3416.0262-12.683.0369-19.0247.0356-3.7841-.0005-7.568.0051-11.352.0264a1121.635 1121.635 0 0 1-10.6868.005c-1.9212-.0032-3.8424.0135-5.7636.0308-7.9592-.0577-13.3864-.9929-19.6685-6.1957-4.5185-5.4718-6.2835-10.2065-5.7891-17.3867.9534-7.081 3.5344-11.085 8.8984-15.6406 4.0873-2.7693 7.7335-3.5477 12.6246-3.5643Z" fill="hsl(0, 99%, 53%)"/></svg></div>
                        <div class="css-175oi2r r-13awgt0">
                            <div class="css-175oi2r r-1awozwy r-18u37iz">
                                <div class="css-175oi2r" style="flex-shrink: 1;">
                                    <div class="css-175oi2r" style="flex-shrink: 1;">
                                        <a href="/profile/${escapedHandle}" aria-label="${escapedDisplayName}'s avatar" aria-pressed="false" role="link" data-no-underline="1" tabindex="0" class="css-175oi2r r-1loqt21 r-1otgn73" style="flex-direction: row; align-items: center; justify-content: flex-start;">
                                            <div class="css-175oi2r" style="width: 35px; height: 35px;">
                                                <div class="css-175oi2r r-1mlwlqe r-1udh08x r-417010" style="width: 35px; height: 35px; border-radius: 17px; background-color: rgb(20, 27, 35);" data-testid="userAvatarImage">
                                                    <div class="css-175oi2r r-1niwhzg r-vvn4in r-u6sd8q r-1p0dtai r-1pi2tsx r-1d2f490 r-u8s1d r-zchlnj r-ipm5af r-13qz1uu r-1wyyakw r-4gszlv" style="background-image: url('${escapedAvatarUrl}');"></div><img alt="" draggable="false" src="${escapedAvatarUrl}" class="css-9pa8cd"></div>
                                                <div class="css-175oi2r" style="position: absolute; inset: 0px; border-width: 1px; border-color: rgb(66, 87, 108); opacity: 0.6; pointer-events: none; border-radius: 17px;"></div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="css-175oi2r" style="overflow: hidden; height: 0px;"></div>
                            <div dir="auto" aria-label="${escapedDisplayName} unfollowed you · ${escapedDate}" class="css-146c3p1" style="color: rgb(241, 243, 245); font-size: 14px; letter-spacing: 0px; font-weight: 400; flex-flow: wrap; padding-top: 6px; padding-bottom: 2px; align-self: flex-start; font-family: InterVariable, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; font-variant: no-contextual;"><a href="/profile/${escapedHandle}" role="link" class="css-1jxf684 r-1loqt21" style="color: rgb(241, 243, 245); font-size: 14px; letter-spacing: 0px; font-weight: 600; font-family: InterVariable, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; font-variant: no-contextual;"><span class="css-1jxf684" style="color: rgb(241, 243, 245); font-size: 14px; letter-spacing: 0px; font-weight: 600; font-family: InterVariable, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; font-variant: no-contextual;">${escapedDisplayName}</span></a> unfollowed you<span class="css-1jxf684" style="color: rgb(140, 158, 178); font-size: 14px; letter-spacing: 0px; font-weight: 400; font-family: InterVariable, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; font-variant: no-contextual;"> · </span><span data-tooltip="November 23, 2024 at 1:37 AM" class="css-1jxf684" style="color: rgb(140, 158, 178); font-size: 14px; letter-spacing: 0px; font-weight: 400; font-family: InterVariable, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'; font-variant: no-contextual;">${escapedTimeAgo}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        return notificationHTML;
    }

    function formatDate(date) {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options).format(date);
    }

    function timeAgo(date) {
        const now = new Date();
        const secondsAgo = Math.floor((now - date) / 1000);

        if (secondsAgo < 60) return `${secondsAgo}s`;
        const minutesAgo = Math.floor(secondsAgo / 60);
        if (minutesAgo < 60) return `${minutesAgo}m`;
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo < 24) return `${hoursAgo}h`;
        const daysAgo = Math.floor(hoursAgo / 24);
        if (daysAgo < 30) return `${daysAgo}d`;
        const monthsAgo = Math.floor(daysAgo / 30);
        if (monthsAgo < 12) return `${monthsAgo}mo`;
        const yearsAgo = Math.floor(monthsAgo / 12);
        return `${yearsAgo}y`;
    }

    function compareJsonArrays(oldArray, newArray) {
        const removed = [];
        oldArray.forEach(item => {
            if (!newArray.some(newItem => newItem.did === item.did)) {
                removed.push(item);
            }
        });

        return removed;
    }

    async function getApiPage(url, accessJwt, cursor) {
        return new Promise(async(resolve, reject) => {
            fetch(`${url}${cursor?`&cursor=${cursor}`:""}`, {
                "credentials": "include",
                "headers": {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
                    "Accept": "*/*",
                    "Accept-Language": "en-CA,en-US;q=0.7,en;q=0.3",
                    "authorization": `Bearer ${accessJwt}`,
                },
                "referrer": "https://bsky.app/",
                "method": "GET",
                credentials: "same-origin",
                "mode": "cors"
            }).then(async (response) => {
                let data = await response.json();
                resolve(data)
            }).catch(err => reject(err));
        })
    }

    async function getFollowers(pdsUrl, accessJwt, did, limit = 100) {
        return new Promise(async(resolve, reject) => {
            let url = `${pdsUrl}xrpc/app.bsky.graph.getFollowers?actor=${did}&limit=${limit}`;
            let followers = [];
            let cursor = null;

            const fetchPage = async () => {
                try {
                    let data = await getApiPage(url, accessJwt, cursor);

                    followers.push(...data.followers);
                    if (data.cursor) {
                        cursor = data.cursor;
                        setTimeout(() => fetchPage(), 1000);
                    } else {
                        resolve(followers);
                    }
                } catch (err) {
                    reject(err);
                }
            }

            fetchPage();
        });
    }

    function removeDuplicates(jsonArray) {
        const seen = {};

        return jsonArray.filter(item => {
            if (!seen[item.did] || new Date(item.unfollowedAt) < new Date(seen[item.did].unfollowedAt)) {
                seen[item.did] = item;
                return true;
            }
            return false;
        });
    }

    function findDatePosition(dates, targetDate) {
        const target = new Date(targetDate);

        for (let i = 0; i < dates.length; i++) {
            if (target < new Date(dates[i])) {
                return i;
            }
        }

        return dates.length;
    }

    async function insertNewNotifications(newNotifDate, html) {
        let feedItems = document.querySelectorAll("[data-testid=\"notificationsScreen\"] div[data-testid*=\"feedItem-by-\"]");
        let itemDates = Array.from(feedItems).filter(element => element.getAttribute("aria-label") && !isNaN((new Date(element.getAttribute("aria-label").split(" · ")[1])).getTime())).map(element => new Date(element.getAttribute("aria-label").split(" · ")[1]));
        let notifications = Array.from(feedItems).map(element => element.parentNode.parentNode);
        let newNotifIndex = findDatePosition(itemDates, newNotifDate);
        notifications[newNotifIndex].insertAdjacentHTML('beforebegin', html);
    }

    document.addEventListener("DOMContentLoaded", function(){
        try {
            if(localStorage.getItem("BSKY_STORAGE")) {
                let bskyStorage = JSON.parse(localStorage.getItem("BSKY_STORAGE"));
                if(bskyStorage.session && bskyStorage.session.currentAccount) {
                    let handle = bskyStorage.session.currentAccount.handle;
                    let did = bskyStorage.session.currentAccount.did;
                    let accessJwt = bskyStorage.session.currentAccount.accessJwt;
                    let pdsUrl = bskyStorage.session.currentAccount.pdsUrl
                    getFollowers(pdsUrl, accessJwt, did, 100).then((followers) => {
                        if(localStorage.getItem("bsky-followers")) {
                            try {
                                let unfollowers = JSON.parse(localStorage.getItem("bsky-followers")).filter(element => !followers.some(item => item.did === element.did))
                                if(unfollowers.length != JSON.parse(localStorage.getItem("bsky-followers")).length) {
                                    if(unfollowers.length > 1) {
                                        localStorage.setItem("bsky-unfollows", JSON.stringify(unfollowers));
                                    } else localStorage.removeItem('bsky-unfollows');
                                }
                                let unfollowed = compareJsonArrays(JSON.parse(localStorage.getItem("bsky-followers")), followers)
                                if(unfollowed.length > 0) {
                                    if(!localStorage.getItem("bsky-unfollows")) {
                                        localStorage.setItem("bsky-unfollows", JSON.stringify(unfollowed.map(unfollower => ({ did: unfollower.did, handle: unfollower.handle, displayName: unfollower.displayName, avatar: unfollower.avatar, unfollowedAt: Date.now() }))))
                                    } else {
                                        let currentUnfollows = removeDuplicates(JSON.parse(localStorage.getItem("bsky-unfollows")));
                                        currentUnfollows.push(...unfollowed.map(unfollower => ({ did: unfollower.did, handle: unfollower.handle, displayName: unfollower.displayName, avatar: unfollower.avatar, unfollowedAt: Date.now() })))
                                        localStorage.setItem("bsky-unfollows", JSON.stringify(removeDuplicates(currentUnfollows)))
                                    }
                                    if(window.location.pathname === "/notifications") {
                                        let htmlArray = removeDuplicates(JSON.parse(localStorage.getItem("bsky-unfollows"))).map(unfollower => ({ displayName: unfollower.displayName, handle: unfollower.handle, html: generateHTML(unfollower.displayName, unfollower.handle, unfollower.avatar, unfollower.unfollowedAt), unfollowedAt: unfollower.unfollowedAt }))
                                        for(var i = 0; i < htmlArray.length; i++) {
                                            let unfollower = htmlArray[i];
                                            const escapedDisplayName = escapeHTML(unfollower.displayName);
                                            const escapedDate = escapeHTML(formatDate(new Date(unfollower.unfollowedAt)));
                                            let unfollowNotif = document.querySelector(`div[aria-label="${escapedDisplayName} unfollowed you · ${escapedDate}"]`)
                                            if(!unfollowNotif) {
                                                insertNewNotifications(unfollower.unfollowedAt, unfollower.html)
                                            } else {
                                                let timeAgoElement = unfollowNotif.querySelector("span[data-tooltip]")
                                                const escapedTimeAgo = escapeHTML(timeAgo(unfollower.unfollowedAt));
                                                if(timeAgoElement.innerText != escapedTimeAgo) timeAgoElement.innerText = escapedTimeAgo;
                                            }
                                        }
                                    }
                                }
                            } catch (e) {}
                        }
                        localStorage.setItem("bsky-followers", JSON.stringify(followers))
                    }).catch(err => console.log(err));
                    setInterval(() => {
                        if(window.location.pathname === "/notifications") {
                            getFollowers(pdsUrl, accessJwt, did, 100).then((followers) => {
                                try {
                                    let unfollowers = JSON.parse(localStorage.getItem("bsky-followers")).filter(element => !followers.some(item => item.did === element.did))
                                    if(unfollowers.length != JSON.parse(localStorage.getItem("bsky-followers")).length) {
                                        if(unfollowers.length > 1) {
                                            localStorage.setItem("bsky-unfollows", JSON.stringify(unfollowers));
                                        } else localStorage.removeItem('bsky-unfollows');
                                    }
                                    let oldFollowersArray = JSON.parse(localStorage.getItem("bsky-followers"));
                                    let unfollowed = compareJsonArrays(oldFollowersArray, followers)
                                    if(unfollowed.length > 0 || (localStorage.getItem("bsky-unfollows") && JSON.parse(localStorage.getItem("bsky-unfollows")).length > 0)) {
                                        if(!localStorage.getItem("bsky-unfollows")) {
                                            localStorage.setItem("bsky-unfollows", JSON.stringify(unfollowed.map(unfollower => ({ did: unfollower.did, handle: unfollower.handle, displayName: unfollower.displayName, avatar: unfollower.avatar, unfollowedAt: Date.now() }))))
                                        } else {
                                            let currentUnfollows = removeDuplicates(JSON.parse(localStorage.getItem("bsky-unfollows")));
                                            currentUnfollows.push(...unfollowed.map(unfollower => ({ did: unfollower.did, handle: unfollower.handle, displayName: unfollower.displayName, avatar: unfollower.avatar, unfollowedAt: Date.now() })))
                                            localStorage.setItem("bsky-unfollows", JSON.stringify(removeDuplicates(currentUnfollows)))
                                        }
                                        let htmlArray = removeDuplicates(JSON.parse(localStorage.getItem("bsky-unfollows"))).map(unfollower => ({ displayName: unfollower.displayName, handle: unfollower.handle, html: generateHTML(unfollower.displayName, unfollower.handle, unfollower.avatar, unfollower.unfollowedAt), unfollowedAt: unfollower.unfollowedAt }))
                                        for(var i = 0; i < htmlArray.length; i++) {
                                            let unfollower = htmlArray[i];
                                            const escapedDisplayName = escapeHTML(unfollower.displayName);
                                            const escapedDate = escapeHTML(formatDate(new Date(unfollower.unfollowedAt)));
                                            let unfollowNotif = document.querySelector(`div[aria-label="${escapedDisplayName} unfollowed you · ${escapedDate}"]`)
                                            if(!unfollowNotif) {
                                                insertNewNotifications(unfollower.unfollowedAt, unfollower.html)
                                            } else {
                                                let timeAgoElement = unfollowNotif.querySelector("span[data-tooltip]")
                                                const escapedTimeAgo = escapeHTML(timeAgo(unfollower.unfollowedAt));
                                                if(timeAgoElement.innerText != escapedTimeAgo) timeAgoElement.innerText = escapedTimeAgo;
                                            }
                                        }
                                    }
                                } catch (e) {
                                    console.log(e)
                                }
                                localStorage.setItem("bsky-followers", JSON.stringify(followers))
                            }).catch(err => console.log(err));
                        }
                    }, 7000)
                }
            }
        } catch (e) {
            console.log(e)
        }
    });
})();
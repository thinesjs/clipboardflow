
# ClipboardFlow

ClipboardFlow is an web and mobile application to seamlessly share clipboards which allows users to paste in texts which can be copied by the users.


## Preview

Development preview is available at https://clipboardflow.thinesjs.com

## To-Do

| API             | APP                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Authentication API - ✅ | Authentication - ✅ |
| Create Clipboard API - ✅ | Create Clipboard - ✅ |
| Retrive Clipboard by Owner ID API - ✅ | Retrive Clipboard by Owner ID - ✅ |
| Update Clipboard API - ❌ | Update Clipboard - ❌ |
| Delete Clipboard API - ❌ | Delete Clipboard - ❌ |
| Profile - ✅ | Profile - ❌ |

## Known Issues

1. Ionic Storage bug - A reload is necessary for the API to function corrently after logging in. (FIXED)
2. Refresh Token - No refresh token endpoint, token is only valid for 60mins. TEMP FIX: logout (/logout) and login again. (FIXED)

## Commits

Since i have pushed the commits to the web sever, future commits wouldn't be made often to GitHub. 
    
## License

[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)

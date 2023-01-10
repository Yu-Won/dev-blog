# public 폴더로 이동
cd public

# sitemap 폴더 삭제 후 생성
rm -rf sitemap
mkdir sitemap

# scripts 폴더로 이동
cd ..
cd scripts

# robots.txt 생성
echo "🤖 robots.txt generate start.."
node ./robots.js
echo "🤖 complete robots.txt"

# sitemap 생성
echo "🗺 sitemap generate start.."
node ./sitemap-common.js
echo "🗺 complete static sitemap!"

# sitemap 압축 및 병합
echo "🗜 sitemap compress start.."
node ./sitemap-compress.js
echo "🗜 complete sitemap compress and merge start"
node ./sitemap.js
echo "🗜 complete sitemap compress and merge!"

# sitemap update ping
curl https://www.google.com/ping?sitemap=https://www.yu-won.blog/sitemap.xml
N=npm
R=run
B=build
C=clear
L=linux
W=win
O=osx
LL=ClientDB-linux-x64
WL=ClientDB-win32-x64
OL=ClientDB-darwin-x64
OUT=dist/
EP=./node_modules/.bin/electron-packager
EB=./node_modules/.bin/electron-builder
TITLE="ClientDB"
PACKAGE_VERSION=`(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')`

xz: xz_win xz_osx

xz_win: tar_win xz_linux
	xz -z $(OUT)$(W)/$(WL).tar -9 -e --threads=0

xz_osx: tar_osx
	xz -z $(OUT)$(O)/$(OL).tar -9 -e --threads=0

xz_linux: tar_linux
	xz -z $(OUT)$(L)/$(LL).tar -9 -e --threads=0

tar: tar_win tar_osx tar_linux

tar_win: pack_win
	tar -cvf $(OUT)$(W)/$(WL).tar $(OUT)$(W)/$(WL)

tar_osx: pack_osx
	tar -cvf $(OUT)$(O)/$(OL).tar $(OUT)$(O)/$(OL)

tar_linux: pack_linux
	tar -cvf $(OUT)$(L)/$(LL).tar $(OUT)$(L)/$(LL)

build: build_win build_osx build_linux

build_win: pack_win
	$(EB) $(OUT)$(W)/$(WL) -platform=win ---out $(OUT)$(W) --config=builder.json

build_osx: pack_osx
	$(EB) $(OUT)$(O)/(OL) -platform=osx ---out $(OUT)$(O) --config=builder.json

build_linux: pack_linux
	$(EB) $(OUT)$(L)/$(LL) -platform=linux ---out $(OUT)$(L) --config=builder.json

pack: pack_win pack_osx pack_linux

pack_win: clear_win
	$(EP) . $(TITLE) --out=$(OUT)$(W) --platform=win32 --arch=x64 -version=$(PACKAGE_VERSION) --icon=assets/win/logo.ico  --ignore=builder.json --ignore=bower.json --ignore=README.md --ignore=.gitignore --ignore=preview.png

pack_osx: clear_osx
	$(EP) . $(TITLE) --out=$(OUT)$(O) --platform=darwin --arch=x64 -version=$(PACKAGE_VERSION) --icon=assets/win/logo.ico  --ignore=builder.json --ignore=bower.json --ignore=README.md --ignore=.gitignore --ignore=preview.png

pack_linux: clear_linux
	$(EP) . $(TITLE) --out=$(OUT)$(L) --platform=linux --arch=x64 -version=$(PACKAGE_VERSION) --icon=assets/win/logo.ico  --ignore=builder.json --ignore=bower.json --ignore=README.md --ignore=.gitignore --ignore=preview.png

clear_win:
	rm -rf $(OUT)$(W)

clear_osx:
	rm -rf $(OUT)$(O)

clear_linux:
	rm -rf $(OUT)$(L)

clear: clear_win clear_osx clear_linux

start:
	electron index.js
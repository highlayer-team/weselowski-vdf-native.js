# weselowski-vdf-native.js

Bindings of [harmony-one/vdf](https://github.com/harmony-one/vdf) to node.js

## Installation


### Build From Source
1. You will need to build the `lib.go` file
    `cd go && go build -o ../include/libvdf.so -buildmode=c-shared lib.go && cd ../`
2. Build the bindings with node-gyp
    `node-gyp configure && node-gyp build`
3, If you get an error saying `/usr/bin/ld: cannot find -l:libvdf.so: No such file or directory` or similar
    You need to export the Export the Library Path
    `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$(pwd)/include`
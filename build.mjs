import esbuild from "esbuild";
import fs from "fs-extra";

import chokidar from "chokidar";

const watch = process.argv.includes("--watch");

const buildParamsBackground = {
    color: true,
    entryPoints: ["extension_src/background/index.jsx"],
    loader: {".js": "jsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file"},
    outdir: "extension_dist/background",
    minify: !watch,
    format: "cjs",
    bundle: true,
    sourcemap: watch,
    logLevel: "error",
};


const buildPopupParams = {
    color: true,
    entryPoints: ["extension_src/popup/index.jsx"],
    loader: {".js": "jsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file"},
    outdir: "extension_dist/popup",
    minify: !watch,
    format: "cjs",
    bundle: true,
    sourcemap: watch,
    logLevel: "error",
};

const buildContentScriptParams = {
    color: true,
    entryPoints: ["extension_src/content/index.jsx"],
    loader: {".js": "jsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file"},
    outdir: "extension_dist/content",
    minify: !watch,
    format: "cjs",
    bundle: true,
    sourcemap: watch,
    logLevel: "error",
};

const buildOptionPageParams = {
    color: true,
    entryPoints: ["extension_src/option/index.jsx"],
    loader: {".js": "jsx", ".json": "json", ".png": "file", ".jpeg": "file", ".jpg": "file", ".svg": "file"},
    outdir: "extension_dist/option",
    minify: !watch,
    format: "cjs",
    bundle: true,
    sourcemap: watch,
    logLevel: "error",
}

if (watch) {
    fs.removeSync("extension_dist");
    fs.copySync("public/", "extension_dist/")

    console.time("[esbuild] init build")
    const background_build_context = await esbuild.context(buildParamsBackground);
    background_build_context.rebuild().catch((e) => {
        console.error(e)
    })

    const popup_build_context = await esbuild.context(buildPopupParams);
    popup_build_context.rebuild().catch((e) => {
        console.error(e)
    })

    const content_build_context = await esbuild.context(buildContentScriptParams);
    content_build_context.rebuild().catch((e) => {
        console.error(e)
    })

    const option_build_context = await esbuild.context(buildOptionPageParams);
    option_build_context.rebuild().catch((e) => {
        console.error(e)
    })

    console.timeEnd("[esbuild] init build")

    console.log(`[esbuild] Watching..`)
    chokidar
        .watch(["extension_src/**/*"],
            {ignored: /(^|[/\\])\../, ignoreInitial: true})
        .on("all",
            (event, path) => {
                console.log(`[esbuild] ${event} ${path}`)
                console.time("[esbuild] Rebuilt background")
                background_build_context.rebuild()
                    .then(() => {

                    })
                    .catch((e) => {
                        console.error(e)
                    })
                console.timeEnd("[esbuild] Rebuilt background")
                console.time("[esbuild] Rebuilt popup")
                popup_build_context.rebuild().then(() => {
                })
                    .catch((e) => {
                        console.error(e)
                    })
                console.timeEnd("[esbuild] Rebuilt popup")

                console.time("[esbuild] Rebuilt content")
                content_build_context.rebuild().then(() => {

                }).catch((e) => {
                    console.error(e)
                })
                console.timeEnd("[esbuild] Rebuilt content")

                console.time("[esbuild] Rebuilt option")
                option_build_context.rebuild().then(() => {

                }).catch((e) => {
                    console.error(e)
                })
                console.timeEnd("[esbuild] Rebuilt option")

            });

    chokidar.watch(["public/**/*"], {ignored: /(^|[/\\])\../, ignoreInitial: true})
        .on("all", (event, path) => {
            console.log(`[esbuild] ${event} ${path}`)
            fs.copySync("public/", "extension_dist/")
        })


} else {
    fs.removeSync("extension_dist")
    fs.copySync("public/", "extension_dist/")
    console.time("[esbuild] Finish")
    Promise.all([
        esbuild.build(buildParamsBackground),
        esbuild.build(buildPopupParams),
        esbuild.build(buildContentScriptParams),
        esbuild.build(buildOptionPageParams)
    ]).catch((e) => {
        console.error(e)
    })
    console.timeEnd("[esbuild] Finish")
}
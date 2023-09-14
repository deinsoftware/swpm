Bun.build({
  entrypoints: [
    './src/cli/swpm.js',
    './src/cli/swpx.js',
    './src/alias/sa.ts',
    './src/alias/sa.ts',
    './src/alias/sae.ts',
    './src/alias/sad.ts',
    './src/alias/sade.ts',
    './src/alias/sag.ts',
    './src/alias/srm.ts',
    './src/alias/srg.ts',
    './src/alias/sup.ts',
    './src/alias/sug.ts',
    './src/alias/sui.ts',
    './src/alias/scr.ts',
    './src/alias/scn.ts',
    './src/alias/scl.ts',
    './src/alias/scb.ts',
    './src/alias/scd.ts',
    './src/alias/scc.ts',
    './src/alias/sca.ts',
    './src/alias/scf.ts',
    './src/alias/sci.ts',
    './src/alias/sr.ts',
    './src/alias/sp.ts',
    './src/alias/spn.ts',
    './src/alias/spy.ts',
    './src/alias/spyb.ts',
    './src/alias/spp.ts',
    './src/alias/spb.ts',
    './src/alias/sx.ts'
  ],
  outdir: './build',
  target: 'bun',
  splitting: true,
  minify: {
    identifiers: true,
    whitespace: true,
    syntax: true
  }
})
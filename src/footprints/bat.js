module.exports = {
    nets: {
        pos: 'pos',
        neg: 'neg'
    },
    params: {
        class: 'PAD', // for Button
        reverse: false
    },
    body: p => {
        const pad = (num, text, net) => {
            if (num >= 2 && !p.param.reverse) return ''
            const dist = 2
            let x = p.param.reverse ? -dist : -dist/2;
            x += dist*num
            return `
                (fp_text user "${text}" (at ${x} 1.8 ${p.rot}) (layer F.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) ))
                (fp_text user "${text}" (at ${x} 1.8 ${p.rot}) (layer B.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))
                (pad 1 thru_hole roundrect (at ${x} 0 ${p.rot}) (size 1.50 2.25) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${net})
            `
        }

        return `
            (module lib:bat (layer F.Cu) (tstamp 5BF2CC94)
                ${p.at /* parametric position */}

                ${'' /* footprint reference */}
                (fp_text reference "${p.ref}" (at 0 0) (layer F.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15))))
                (fp_text value "" (at 0 0) (layer F.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15))))

                ${''/* battery pads */}
                ${pad(0, 'B+', p.net.pos.str)}
                ${pad(1, 'B-', p.net.neg.str)}
                ${pad(2, 'B+', p.net.pos.str)}
            )
        `
    }
}

"use strict";

gs.loadNewComposition = function() {
	var i = 0, trks = {},
		synthId = common.uuid(),
		patId = common.uuid(),
		keysId = common.uuid();

	for ( ; i < env.def_nbTracks; ++i ) {
		trks[ common.smallId() ] = { order: i, toggle: true, name: "" };
	}
	gs.loadComposition( {
		id: common.uuid(),
		bpm: env.def_bpm,
		stepsPerBeat: env.def_stepsPerBeat,
		beatsPerMeasure: env.def_beatsPerMeasure,
		name: "",
		duration: 0,
		patterns: {
			[ patId ]: {
				name: "pat",
				type: "keys",
				keys: keysId,
				synth: synthId,
				duration: env.def_beatsPerMeasure
			}
		},
		synths: {
			[ synthId ]: {
				name: "synth",
				oscillators: {
					[ common.uuid() ]: { type: "sine",     detune:   0, gain: 1, pan:   0 },
					[ common.uuid() ]: { type: "triangle", detune: -50, gain: 1, pan: -.2 },
					[ common.uuid() ]: { type: "square",   detune: +50, gain: 1, pan: +.2 }
				}
			}
		},
		tracks: trks,
		blocks: {},
		keys: {
			[ keysId ]: {}
		}
	} ).then( function() {
		gs.openSynth( synthId );
		gs.openPattern( patId );
	}, console.log.bind( console ) );
	return false;
};
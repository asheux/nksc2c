import moment from "moment";

export const isMobile = window.innerWidth <= 981;

export const isDark = () => {
  const dark = localStorage.getItem("darkTheme");
  return dark === "true";
};

export const dateFormatter = (date) =>
  moment(date).format("MMM Do YYYY, h:mm:ss a");

export const dateFormatterNoTime = (date) => moment(date).format("MMM Do YYYY");

export const projects = [{ label: "The Kosmic Clean Up", value: "kosmic" }];

export const searchOptions = {
  keys: ["name", "thought"],
  includeScore: true,
  threshold: 0.3,
};

export const nksChapters = [
  {
    id: 0,
    value: "chapter00",
    label: "Introduction to NKS Click to Copy",
    data: {},
  },
  {
    id: 2,
    value: "chapter02",
    label: "The Crucial Experiment",
    data: {
      section01: {
        id: 1,
        name: "How Do Simple Programs Behave?",
        c2cdata: [
          "page0027b_rule30-rule",
          "page0032b_rule110-rule",
          "page0033a_rule110-big.1",
          "page0034a_rule110-big.2",
          "page0035a_rule110-big.3",
          "page0036a_rule110-big.4",
          "page0037a_rule110-big.5",
          "page0871e_r30fluct",
          "page0871g_r30rw2",
        ]
      }
    },
  },
  {
    id: 3,
    value: "chapter03",
    label: "The World of Simple Programs",
    data: {
      section02: {
        id: 2,
        name: "More Cellular Automata",
        c2cdata: [
          "page0053b_rulenumbering",
          "page0060a_totalistic.777",
          "page0060b_totalistic.r777",
          "page0884a_optimalMachine",
          "page0885b_r2grids",
          "page0886a_r2examples",
          "page0886c_algebraic2"
        ]
      },
      section03: {
        id: 3,
        name: "Mobile Automata",
        c2cdata: [
          "page0077a_xma.seq",
          "page0887a_maperiods",
        ]
      },
      section04: {
        id: 4,
        name: "Turing Machines",
        c2cdata: [
          "page0079a_tmseq",
          "page0079b_tmseqrules",
          "page0080a_seq34",
          "page0080b_seq34.comp",
          "page0080c_seq34.rules",
          "page0081a_tmbig.evol",
          "page0081b_tmbig.comp",
          "page0081c_tmbig.rule",
        ]
      },
      section05: {
        id: 5,
        name: "Substitution Systems",
        c2cdata: [
          "page0085a_ss1.1",
          "page0085b_ss1.2",
          "page0086a_ss1.3",
          "page0087a_bigseq1",
          "page0087b_bigseq2",
          "page0087c_bigseq.rules",
          "page0889a_tm-structs",
          "page0889b_beaverturing1",
          "page0889c_beaverturing2",
          "page0889d_marxen.1",
          "page0889e_marxen.2",
          "page0889f_marxen.3",
          "page0892b_c-curve",
        ]
      },
      section07: {
        id: 7,
        name: "Tag Systems",
        c2cdata: [
          "page0093a_css1",
          "page0093b_css1.rules",
          "page0094a_css2.grid",
          "page0094b_css2.rules",
          "page0094c_css2.plots1",
          "page0094d_css2.plots2x",
        ]
      },
      section08: {
        id: 8,
        name: "Cyclic Tag Systems",
        c2cdata: [
          "page0095a_CTex",
          "page0095b_CTex.rule",
          "page0095c_CTex.sum",
          "page0096a_CTseq",
          "page0096b_CTseq.sum",
          "page0096c_ctplots",
        ]
      },
      section09: {
        id: 9,
        name: "Register Machines",
        c2cdata: [
          "page0098a_simple",
          "page0099a_rm25.2",
          "page0099b_rm25.3",
          "page0099c_rm25.1",
          "page0100a_rm28.r",
          "page0100b_rm28.1",
          "page0100c_rm28.2",
          "page0100d_rm28.3",
          "page0100e_rm28.4",
        ]
      },
      section10: {
        id: 10,
        name: "Symbolic Systems",
        c2cdata: [
          "page0102a_textual",
          "page0102b_cbicon",
          "page0103a_bmap1",
          "page0103a_bmapcomp",
          "page0103b_bmap3",
          "page0103c_bmaprule",
          "page0103d_bmap2a",
          "page0103e_bmap2b",
          "page0896a_symbreps",
          "page0897b_ruletrees",
          "page0897c_treeseq",
        ]
      }
    }
  },
  {
    id: 4,
    value: "chapter04",
    label: "Systems Based on Numbers",
    data: {
      section02: {
        id: 2,
        name: "Elementary Arithmetic",
        c2cdata: [
          "page0117a_sliver",
          "page0117b_succgrid",
          "page0118a_ndigits",
          "page0119a_powers",
          "page0120a_big3n",
          "page0123a_5nseq",
          "page0124a_5n.dig",
          "page0124b_5n",
          "page0126a_bigpalin",
          "page0127a_bigpalin2",
          "page0903b_power3",
          "page0904a_3n1stops",
          "page0905b_p6gaps",
        ]
      },
      section04: {
        id: 4,
        name: "The Sequence of Primes",
        c2cdata: [
          "page0133a_primeprops.1",
          "page0133b_primeprops.2",
          "page0135a_numtheory",
          "page0908b_prcomplex2",
          "page0908c_prgrowth",
          "page0908d_ulam",
        ]
      },
      section05: {
        id: 5,
        name: "Mathematical Constants",
        c2cdata: [
          "page0137a_PiDigits",
          "page0137b_PiDigitsBase2",
          "page0138a_RationalNumbers",
          "page0140a_Roots",
          "page0142a_RootsLogsExps",
          "page0143a_PiConstruction",
          "page0143b_ContFracPi",
          "page0144a_MoreContFrac",
          "page0911a_spectra",
          "page0911c_aliquot",
          "page0912a_rats",
          "page0913b_champerplot",
          "page0913c_champerplot2",
          "page0914a_cfapprox",
          "page0915a_champcf",
          "page0915b_roth",
          "page0915c_euclid1",
          "page0915d_euclid2",
          "page0916b_integercomplexity",
        ]
      },
      section06: {
        id: 6,
        name: "Mathematical Functions",
        c2cdata: [
          "page0145a_mathfunc",
          "page0146a_sines",
          "page0147a_cfcurves",
          "page0148a_zeta",
          "page0917c_3sumdist"
        ]
      },
      section07: {
        id: 7,
        name: "Iterated Maps and the Chaos Phenomenon",
        c2cdata: [
          "page0918a_fourier.2",
          "page0918b_fourier.3",
          "page0918c_fourier.4",
          "page0919a_chaos.num",
          "page0920a_chaos.num32",
        ]
      },
      section08: {
        id: 8,
        name: "Continuous Cellular Automata",
        c2cdata: [
          "page0156a_diffusion.rule",
          "page0156b_diffusion.grid",
        ]
      },
      section09: {
        id: 9,
        name: "Partial Differential Equations",
        c2cdata: [
          "page0923a_superpde",
          "page0923b_waveD",
          "page0924a_courant",
          "page0924b_pderes",
        ]
      },
      section10: {
        id: 10,
        name: "Continuous Versus Discrete Systems",
        c2cdata: [
          "page0925a_parabolic",
        ]
      }
    }
  },
  {
    id: 5,
    value: "chapter05",
    label: "Two Dimensions and Beyond",
    data: {
      section02: {
        id: 2,
        name: "Cellular Automata",
        c2cdata: [
          "page0171c_942b",
          "page0180a_Small2DGrowth13",
          "page0180b_Small2DGrowth15",
          "page0180c_Small2DGrowth17",
          "page0180d_GoodCAGrowth3D",
          "page0182a_3df.1",
          "page0182b_3df.2",
          "page0182c_ca3dicon6",
          "page0183c_ca3dicon26",
          "page0928d_ulam",
          "page0929a_ulamseq",
          "page0929b_ulamseq2",
          "page0929c_174826",
          "page0929d_3dca"
        ]
      },
      section03: {
        id: 3,
        name: "Turing Machines",
        c2cdata: [
          "page0184a_tmex.1",
          "page0184b_tmex.2",
          "page0184c_tmex.rule",
          "page0185a_tmseq.1",
          "page0185b_tmseq.2",
          "page0185c_tmseq.3",
          "page0185d_tmseq.4",
          "page0185e_tmseq.5",
          "page0185f_tmseq.rules",
          "page0186a_tmbpa",
          "page0930a_sfpoly",
          "page0930b_cairo-steps",
          "page0930c_cairo-ca-2",
          "page0930e_penrose-ca-2",
        ]
      },
      section04: {
        id: 4,
        name: "Substitution Systems and Fractals",
        c2cdata: [
          "page0187a_grid",
          "page0187b_grid.rule",
          "page0188b_bigss.rules",
          "page0189c_fract.rule",
          "page0192a_ndss1",
          "page0192b_ndssrule1",
          "page0192c_ndssa",
          "page0192d_ndssrule2",
          "page0931a_tm2dpaths",
          "page0931b_turingran2d",
          "page0932b_ell",
          "page0933a_SS3Dpix",
          "page0933b_fract-dim",
          "page0934a_mandel",
          "page0934b_mansequence",
        ]
      },
      section05: {
        id: 5,
        name: "Network Systems",
        c2cdata: [
          "page0194a_smallgraphs",
          "page0195a_1dnet",
          "page0195b_2dnet",
          "page0195c_3dnet",
          "page0196a_htree",
          "page0196b_hextree",
          "page0196c_btree",
          "page0197a_sier",
          "page0198a_dn-layout",
          "page0199a_dn-ex1",
          "page0200a_dn-ex2",
          "page0201a_dn-ex3",
          "page0202a_dnbig-a",
          "page0202b_dnbig-b",
          "page0202c_dnbig-c",
          "page0202d_dnbig-a-sz",
          "page0202e_dnbigBand",
          "page0202f_caption1",
          "page0203a_dn2aAnd2b",
          "page0203b_caption2",
          "page0935a_manbdy",
          "page0936a_sdn",
          "page0936b_sdn-sz",
          "page0936c_dn-dims",
        ]
      },
      section06: {
        id: 6,
        name: "Multiway Systems",
        c2cdata: [
          "page0204a_mw-triv1",
          "page0205a_mw-seq1",
          "page0205b_mwseq2",
          "page0205c_mwseq2-sz1",
          "page0205d_mwseq2-sz2",
          "page0206a_mwr4",
          "page0206b_mwr4.rule",
          "page0206c_mwr4.sz1",
          "page0206d_mwr4.sz2",
          "page0207a_mwstack-grid",
          "page0207b_mwstack-grid-rule",
          "page0208a_mwstack-2",
          "page0208b_mwstack-1",
          "page0208c_mwstack-rules",
          "page0209a_mwnet1",
          "page0209b_mwnet2",
          "page0937a_mwstack",
          "page0937b_mwdots",
        ]
      },
      section07: {
        id: 7,
        name: "Systems Based on Constraints",
        c2cdata: [
          "page0211b_firstgrid",
          "page0214a_171.1",
          "page0215a_171.2",
          "page0216a_seeded",
          "page0218a_seq",
          "page0941a_bruijn",
          "page0941b_constraint-nums",
          "page0943a_r30constraint",
          "page0943b_polyom",
          "page0943c_polysteps",
          "page0943d_polybig",
          "page0944a_diolinear",
          "page0945a_pell",
          "page0945b_pyth.1",
          "page0945c_pyth.2",
        ]
      }
    }
  },
  {
    id: 6,
    value: "chapter06",
    label: "Starting from Randomness",
    data: {
      section01: {
        id: 1,
        name: "The Emergence of Order",
        c2cdata: [
          "page0224a_class1-1",
          "page0224b_class1-2",
          "page0225a_class2-1",
          "page0226a_r126",
          "page0226b_r126.rule",
          "page0227a_class-3",
          "page0228a_class-3-2",
          "page0229a_r110.1",
          "page0230a_r110.2",
          "page0947a_center-random",
        ]
      },
      section04: {
        id: 4,
        name: "Systems of Limited Size and Class 2 Behavior",
        c2cdata: [
          "page0950b_denombig",
          "page0950c_additive-periods",
        ]
      },
      section05: {
        id: 5,
        name: "Randomness in Class 3 Systems",
        c2cdata: [
          "page0951a_rulecomp",
          "page0951b_r225",
          "page0952a_addnest",
          "page0952b_add90",
          "page0952c_add250",
          "page0952d_monoids",
        ]
      },
      section06: {
        id: 6,
        name: "Special Initial Conditions",
        c2cdata: [
          "page0266b_r30-rule",
          "page0954a_denplots",
          "page0954c_periodarrays",
        ]
      },
      section07: {
        id: 7,
        name: "The Notion of Attractors",
        c2cdata: [
          "page0277a_FSMexplain",
          "page0278a_fsmc1c2",
          "page0279a_fsm-c34",
          "page0280a_surjective",
          "page0280b_fsm-30-90",
          "page0956a_uniqinit",
          "page0961a_stgAddArray",
          "page0962a_stgMultiplyArray",
          "page0962b_stgRule254size4",
          "page0962c_stgRule254array",
          "page0962d_stgRule132combo",
          "page0962e_stgRule30big",
          "page0962f_stgRule45big",
          "page0963a_stgRule110big",
          "page0963b_stgRule170row",
        ]
      },
      section08: {
        id: 8,
        name: "Structures in Class 4 Systems",
        c2cdata: [
          "page0964a_stgRandom",
          "page0964b_c20-life",
          "page0964d_life-composite",
          "page0964e_life-spaceship",
          "page0964f_still-life",
          "page0964g_life-i1",
          "page0964h_life-slice1",
          "page0965a_oscillators",
          "page0965b_gliderspeedsgrid",
          "page0965c_lifegun",
          "page0965d_life-x1-i",
          "page0965e_life-x1-sl",
          "page0965f_life-sfill",
          "page0965g_life-pt-200",
          "page0965h_life-pt-500",
        ]
      }
    }
  },
  {
    id: 7,
    value: "chapter07",
    label: "Mechanisms in Programs and Nature",
    data: {
      section04: {
        id: 4,
        name: "Chaos Theory and Randomness from Initial Conditions",
        c2cdata: [
          "page0311c_machine-big",
          "page0314a_3body2",
          "page0972a_3bodygallery1",
        ]
      },
      section05: {
        id: 5,
        name: "The Intrinsic Generation of Randomness",
        c2cdata: [
          "page0325c_r30transform",
          "page0973a_3bodygallery2",
          "page0973b_3bodyparams",
        ]
      },
      section06: {
        id: 6,
        name: "The Phenomenon of Continuity",
        c2cdata: [
          "page0328a_rw-singles",
          "page0328b_rw-1020",
          "page0328c_rw-gaussian",
          "page0330a_2drw.sq.seq",
          "page0330b_2drw.sq.big",
          "page0330c_2drw.tri.seq",
          "page0330d_2drw.tri.big",
          "page0331a_eden.seq0a",
          "page0331b_eden.seq1",
          "page0331c_eden.seq2",
          "page0332a_geden",
          "page0332b_geden.grid",
          "page0336a_domains",
          "page0978a_randomWalkArray",
          "page0978b_saw",
          "page0978c_edeniso",
          "page0979a_ag2d-1",
          "page0979b_ag2d-stuck",
          "page0979c_ag2d-2",
          "page0979d_ag1d",
          "page0979e_dla",
          "page0979f_746shape",
          "page0980a_shapecomparison",
        ]
      },
      section07: {
        id: 7,
        name: "Origins of Discreteness",
        c2cdata: [
          "page0340a_2dptgrid",
          "page0340b_2dpt",
          "page0340c_2dptpgrid",
          "page0340d_2dptp",
          "page0982a_magnetization",
          "page0983a_isingTimeEvolve",
          "page0983b_IsingSlice",
          "page0983c_ising.seq",
        ]
      },
      section08: {
        id: 8,
        name: "The Problem of Satisfying Constraints",
        c2cdata: [
          "page0343a_counts",
          "page0344a_tileseq1",
          "page0344b_tileseq2",
          "page0344c_distseq",
          "page0345a_pattseq",
          "page0349a_2dcacon",
          "page0349b_circles",
          "page0349c_fccpack",
          "page0350a_packedCirclesList",
          "page0350b_packedCircles",
          "page0984a_sine",
          "page0984b_contour",
          "page0984c_shocks",
          "page0987a_toruscharge",
          "page0987c_vor1",
          "page0987d_vor2",
        ]
      },
      section09: {
        id: 9,
        name: "Origins of Simple Behavior",
        c2cdata: [
          "page0353a_uni-1",
          "page0353b_uni-2",
          "page0353c_uni-2a",
          "page0353d_uni-4",
          "page0357a_nest2",
          "page0357b_nest1",
          "page0357c_sier2",
          "page0357d_sier1",
          "page0357e_trees",
          "page0989c_sand1",
          "page0989d_sand1a",
          "page0990a_sand2",
          "page0990b_sand3",
        ]
      }
    }
  },
  {
    id: 8,
    value: "chapter08",
    label: "Implications for Everyday Systems",
    data: {
      section02: {
        id: 2,
        name: "The Growth of Crystals",
        c2cdata: [
          "page0373a_squarerules",
          "page0993a_hopper",
        ]
      },
      section04: {
        id: 4,
        name: "Fluid Flow",
        c2cdata: [
          "page0378a_microsteps",
          "page0378b_micropix-a",
          "page0378c_micropix-b",
          "page0378d_micropix-c",
          "page0378e_fluidRules",
          "page0378f_micropix-d",
          "page0380a_bigpix",
          "page1000a_wave",
          "page1000b_shock",
        ]
      },
      section06: {
        id: 6,
        name: "Growth of Plants and Animals",
        c2cdata: [
          "page0402a_tree-array",
          "page0406a_tree2-array",
          "page0407a_parspace",
          "page0414a_shell-grow",
          "page0415a_shell-vary",
          "page0416a_shell-grid",
          "page0416b_shells",
          "page0418a_folding",
          "page1006a_darcyleaves",
          "page1006b_connected",
          "page1008a_circles",
          "page1009a_wrong-shells",
        ]
      },
      section07: {
        id: 7,
        name: "Biological Pigmentation Patterns",
        c2cdata: [
          "page1013a_spiralwave",
        ]
      },
      section08: {
        id: 8,
        name: "Financial Systems",
        c2cdata: [
          "page1014a_zipf",
        ]
      }
    }
  },
  {
    id: 9,
    value: "chapter09",
    label: "Fundamental Physics",
    data: {
      section02: {
        id: 2,
        name: "The Notion of Reversibility",
        c2cdata: [
          "page1017a_revca",
        ]
      },
      section03: {
        id: 3,
        name: "Irreversibility and the Second Law of Thermodynamics",
        c2cdata: [
          "page0446a_2d.1",
          "page0446b_2d.2",
          "page0447a_2dslice",
          "page0447b_paddle",
          "page0449a_entropy",
        ]
      },
      section04: {
        id: 4,
        name: "Conversed Quantities and Continuum Phenomena",
        c2cdata: [
          "page0460a_blrule",
          "page0460b_blpatt",
          "page0460c_blgrid",
          "page0460d_bl22seq",
          "page0461a_bacq",
          "page0464a_blaver1",
          "page0464b_blaver2",
          "page1022a_xcon",
        ]
      },
      section07: {
        id: 7,
        name: "Space and a Network",
        c2cdata: [
          "page0476b_smalltri",
          "page0477a_gtri1",
          "page0477b_gtri2",
          "page0477c_gtri3",
          "page0477d_dodec",
          "page0479a_dimensions",
          "page1029a_diameter",
          "page1029b_girth",
        ]
      },
      section08: {
        id: 8,
        name: "The Relationship of Space and Time",
        c2cdata: [
          "page0483a_netconstraints",
        ]
      },
      section09: {
        id: 9,
        name: "Time and Causal Networks",
        c2cdata: [
          "page0489a_ma1row11",
          "page0489b_ma1row1r",
          "page0489c_ma1row12",
          "page0489d_ma1row21",
          "page0489e_ma1row22",
          "page0489g_ma1row31",
          "page0489h_ma1row32",
          "page0492a_mrs1fp",
          "page0492b_mrsr1",
          "page0493a_mrs2fp",
          "page0493b_mrsr2",
          "page0495a_manumbered",
          "page0496a_mactnet",
          "page0496b_mactrule",
          "page0496c_mact",
          "page1032a_cubicsymmetric",
        ]
      },
      section10: {
        id: 10,
        name: "The Sequencing of Events in the Universe",
        c2cdata: [
          "page0497a_mwtonet",
          "page0497b_mwtonetrule",
          "page0497c_mwtonet1",
          "page0497d_mwtonet2",
          "page0497e_mwtonet3",
          "page0498a_sss1",
          "page0498b_sssrules",
          "page0498c_sssnet",
          "page0500a_smw1e",
          "page0500b_smw1n",
          "page0500c_smw2e",
          "page0500d_smw2n",
          "page0500e_smw22p",
          "page0500f_smw23f",
          "page0500g_smwrules",
          "page0501a_randorder1",
          "page0501b_ro-side",
          "page0502a_singlerules",
          "page0502b_singlerules-rules",
          "page1034a_sca-grid",
          "page1034b_sca-size",
          "page1034c_sca-additive",
          "page1034d_sca-random",
          "page1034e_sca-random-1",
        ]
      },
      section11: {
        id: 11,
        name: "Uniqueness and Branching in Time",
        c2cdata: [
          "page0504a_mw1",
          "page0506a_mw2",
          "page0507a_mw3",
          "page1035a_abcarule",
          "page1035b_abca1",
          "page1035c_firing1",
          "page1036a_mwdims",
        ]
      },
      section12: {
        id: 12,
        name: "Evolution of Networks",
        c2cdata: [
          "page0509a_niss",
          "page0509b_prules",
          "page0510a_symrule",
          "page0510b_flipways",
          "page0510c_flipcluster",
          "page0511a_netevol1",
          "page0511b_netevol3D",
          "page0511c_netevol.rule",
          "page0512a_netevol-more",
          "page0513a_ninetevol1",
          "page0513b_ninetevol3D",
          "page0513c_netevol.rule",
          "page0514a_tnet1",
          "page0514b_tnet3",
          "page0514c_tnet2",
          "page0514d_allnpnets",
          "page0515a_nonoverlaps",
          "page1037a_conflu",
          "page1037b_fconflu",
          "page1038a_ruleupdate",
          "page1038b_alexander",
          "page1038c_tetracube",
          "page1039a_random-pn1",
          "page1039b_random-pn2",
          "page1039c_closednets",
          "page1039d_clustercounts",
        ]
      },
      section13: {
        id: 13,
        name: "Space, Time and Relativity",
        c2cdata: [
          "page0516a_cnslices-1",
          "page0516b_cnslices-rule",
          "page0516c_cnslices-2",
          "page0518a_crisscross-cn-rule",
          "page0518b_crisscross-cn-1a",
          "page0518c_crisscross-cn-1",
          "page0518d_crisscross-cn-1c",
          "page1040a_mpn",
          "page1040b_nonoverlapdigraph",
          "page1041a_posets",
          "page1042a_relativity",
        ]
      },
      section14: {
        id: 14,
        name: "Elementary Particles",
        c2cdata: [
          "page1046a_knots",
        ]
      },
      section15: {
        id: 15,
        name: "The Phenomenon of Gravity",
        c2cdata: [
          "page0531a_geodesics",
          "page0532a_flatSpace",
          "page0532b_curvedSpace",
          "page1049a_spheres",
          "page1050a_hyperbolic",
          "page1052a_sprinkle",
          "page1055a_6j"
        ]
      },
      section16: {
        id: 16,
        name: "Quantum Phenomena",
        c2cdata: [
          "page1060a_schrodinger",
          "page1060b_feynman",
        ]
      }
    }
  },
  {
    id: 10,
    value: "chapter10",
    label: "Processes of Perception and Analysis",
    data: {
      section05: {
        id: 5,
        name: "Date Compression",
        c2cdata: [
          "page0566a_nested",
          "page0571a_2dptr",
          "page0571a_2dptr-1",
        ]
      },
      section06: {
        id: 6,
        name: "Irreversible Data Compression",
        c2cdata: [
          "page1072a_randseq",
          "page1072b_2dseq-rle",
          "page1072c_walsh1dseq",
          "page1073a_walsh",
          "page1073b_lseq",
          "page1073c_walshcoeffs",
          "page1073d_image-aver",
        ]
      },
      section07: {
        id: 7,
        name: "Visual Perception",
        c2cdata: [
          "page0579b_temp1r",
          "page1074a_fourier-seq",
          "page1074b_wavelet-funs",
          "page1074c_wavelet-seq",
          "page1075a_gaussians",
          "page1076a_sketches",
          "page1076b_textons",
          "page1076c_convolution",
          "page1077a_cafilters",
          "page1077b_ordered",
          "page1078a_floydsteinberg",
          "page1078b_nestdither",
          "page1078c_2x2patts",
          "page1078d_isodipole",
          "page1078e_gridoverlaps",
          "page1078f_MoireExamples",
          "page1078g_PeriodicMoire",
        ]
      },
      section08: {
        id: 8,
        name: "Auditory Perception",
        c2cdata: [
          "page0586a_ss-spectra",
          "page1079a_present",
          "page1079b_chords",
        ]
      },
      section09: {
        id: 9,
        name: "Statistical Analysis",
        c2cdata: [
          "page1082a_caspectra",
          "page1082b_2dss-spectra",
          "page1084a_fitting",
        ]
      },
      section10: {
        id: 10,
        name: "Cryptography and Cryptanalysis",
        c2cdata: [
          "page0605a_prob30",
          "page1086a_redundant",
          "page1087a_r30-probs",
          "page1088a_d4winners",
          "page1088b_d5winners-a",
          "page1088c_d5winners-b",
          "page1088d_golomb",
          "page1089a_r30backtracking",
          "page1089b_btrees-2",
          "page1089c_carecognition",
        ]
      },
      section11: {
        id: 11,
        name: "Traditional Mathematics and Mathematical Formulas",
        c2cdata: [
          "page0606b_modgrid-rule",
          "page0608d_sier-dfa",
          "page0609a_dfas",
          "page0616a_bf-1",
          "page0617a_bf-2",
          "page0618a_bf-3",
          "page0619a_nand",
          "page1090a_factor-times",
          "page1090b_quadres",
          "page1091a_difftables",
          "page1093a_contca",
          "page1096c_nand-sizes",
          "page1097a_nandextras",
        ]
      },
      section12: {
        id: 12,
        name: "Human Thinking",
        c2cdata: [
          "page1101a_nn2d",
          "page1101b_continuous",
        ]
      },
      section13: {
        id: 13,
        name: "Higher Forms of Perception and Analysis",
        c2cdata: [
          "page1105a_gamedata",
        ]
      }
    }
  },
  {
    id: 11,
    value: "chapter11",
    label: "The Notion of Computation",
    data: {
      section03: {
        id: 3,
        name: "The Phenomenon of Universality",
        c2cdata: [
          "page1109b_randcomp",
        ]
      },
      section04: {
        id: 4,
        name: "A Universal Cellular Automaton",
        c2cdata: [
          "page0648a_ucarules",
          "page0649a_ucasmall.254",
          "page0649b_ucan.254",
          "page0650a_ucasmall.90",
          "page0650b_ucan.90",
          "page0651a_ucasmall.30",
          "page0651b_ucan.30",
        ]
      },
      section05: {
        id: 5,
        name: "Emulating Other Systems with Cellular Automata",
        c2cdata: [
          "page0657a_ma",
          "page0657b_ma.r1",
          "page0657c_ma.r2",
          "page0658a_tm.r1",
          "page0658b_tm",
          "page0658c_tm.r2",
          "page0659a_ss",
          "page0659b_ss.r",
          "page0659c_ss.2",
          "page0660c_casss",
          "page0661a_rm",
          "page0661b_rm.r",
          "page0661c_3n.g",
          "page0662a_logic",
          "page0662b_logic.r",
          "page0663a_ram"
        ]
      },
      section06: {
        id: 6,
        name: "Emulating Cellular Automata with Other Systems",
        c2cdata: [
          "page0664a_ma.1",
          "page0664b_ma.2",
          "page0665a_tm.1",
          "page0665b_tm.2",
          "page0665c_tm.r",
          "page0666a_ndss",
          "page0667a_sss1",
          "page0667b_sss2",
          "page0667c_sss.r",
          "page0667d_tag1",
          "page0667e_tag2",
          "page0667f_tag.r",
          "page0668a_symb-1",
          "page0668b_symb-r1",
          "page0668c_symb-r2",
          "page0668d_symb-c1",
          "page0668e_symb-c2",
          "page0668f_symb-lab1",
          "page0668g_symb-lab2",
          "page0669a_ctts1-2",
          "page0669b_ctts1-1",
          "page0669c_ctts1-1rule",
          "page0669d_ctts1-2rule",
          "page0669e_tmr31evolx",
          "page0669f_tmr31evol",
          "page0669g_tmr31rule",
          "page0669h_tmr31rulex",
          "page0669i_tmr3evolx",
          "page0669j_tmr3evol",
          "page0669k_tmr3rule",
          "page0670a_ts1bcombined-1",
          "page0670b_ts1bcombined-3",
          "page0670c_ts1bcombined-4",
          "page0670d_ts1bcombined-5",
          "page0670e_ts1bcombined-6",
          "page0670f_ts1bcombined-2",
          "page0671a_tmtorm2",
          "page0671a_tmtorm2.1",
          "page0671b_tmtorm2.2",
          "page0671d_tmtorm2.4",
          "page0672a_tmtorm",
          "page0672a_tmtorm.1",
          "page0672b_tmtorm.2",
          "page0672c_tmtorm.3",
          "page0672d_tmtorm.4",
          "page0672e_tmtorm.5",
          "page0672f_tmtorm.6",
          "page0673a_as-rm",
          "page0673b_rm.rule",
          "page0673c_as.rule"
        ]
      },
      section08: {
        id: 8,
        name: "The Rule 110 Cellular Automaton",
        c2cdata: [
          "page0677a_rule110.ex",
          "page0679a_r110.a",
          "page0679a_r110.ab",
          "page0679b_r110.b",
          "page0679b_r110.ctrule",
          "page0679c_r110.ctsum",
          "page0679d_r110.c",
          "page0679e_r110.d",
          "page0681a_structs",
          "page0683a_r110.big",
          "page0684a_r110.det1",
          "page0685a_r110.det2",
          "page0686a_r110.det3",
          "page0688a_multitrack",
        ]
      },
      section10: {
        id: 10,
        name: "Class 4 Behavior and Universality",
        c2cdata: [
          "page0692a_class4",
          "page0692b_class4.a",
          "page0692c_class4.b",
          "page0692d_class4.c",
          "page0692e_class4.d",
          "page1116a_r110init",
          "page1117a_r2class4",
          "page1117b_lifenand",
          "page1117c_wireworld",
        ]
      },
      section11: {
        id: 11,
        name: "The Threshold of Universality in Cellular Automata",
        c2cdata: [
          "page0694a_c12",
          "page0695a_cnested",
          "page0695b_additive",
          "page0696a_r54",
          "page0696b_r54.rule",
          "page0697a_r54structs",
          "page0699a_r73.rand",
          "page0700a_r73structs",
          "page0700b_r30",
          "page0701a_r45",
          "page0702a_ca-blocksims",
          "page0703a_r30emul",
          "page0703b_r30emul.r",
          "page0704a_r30emulall",
          "page0705a_emulsummary",
          "page1118a_r41",
          "page1118b_simulationNetwork",
        ]
      },
      section12: {
        id: 12,
        name: "Universality in Turing Machines and Other Systems",
        c2cdata: [
          "page0706a_minsky.rule",
          "page0706b_mtmevol",
          "page0706c_mtmtag",
          "page0706d_mtmtagrule",
          "page0706e_mtmcevol",
          "page0707a_tm25",
          "page0707b_tm25evol",
          "page0707c_tm25tmc",
          "page0708a_tm42-evol",
          "page0708b_tm42-comp",
          "page0708c_tm42-rules",
          "page0709a_tm32-evol",
          "page0709b_tm32-comp",
          "page0709c_tm32-rule",
          "page0710a_tm32search-rules",
          "page0710b_tm32search",
          "page0711a_combinator-rules",
          "page0712a_combinators",
          "page0713a_r110combinator",
          "page0714a_r110evol",
          "page1120a_utm32",
          "page1120b_tmspikes",
          "page1121a_urm",
        ]
      }
    }
  },
  {
    id: 12,
    value: "chapter12",
    label: "The Principle of Computational Equivalence",
    data: {
      section03: {
        id: 3,
        name: "The Content of the Principle",
        c2cdata: [
          "page0725a_r30array",
        ]
      },
      section04: {
        id: 4,
        name: "The validity of the Principle",
        c2cdata: [
          "page0731a_digits",
          "page0732a_pde1",
          "page0732b_pde2",
          "page1127a_blockpos",
        ]
      },
      section05: {
        id: 5,
        name: "Explaining the Phenomenon of Complexity",
        c2cdata: [
          "page1131a_fmseq"
        ]
      },
      section06: {
        id: 6,
        name: "Computational Irreducibility",
        c2cdata: [
          "page0744a_reduce",
          "page0749a_powersof2",
        ]
      },
      section08: {
        id: 8,
        name: "Undecidability and Intractability",
        c2cdata: [
          "page0757a_pcp",
          "page0759a_tmadd1",
          "page0759b_tmadd1rule",
          "page0759c_tmaddtime",
          "page0760a_tmadd2",
          "page0761a_tmcoll",
          "page0763a_tm34-1",
          "page0763b_tm34-3",
          "page0763c_tm34-2",
          "page0765a_ca-tm",
          "page0765b_mwpath",
          "page0767a_npcomplete-1",
          "page0767b_npcomplete-1-rule",
          "page0768a_tmtodnf",
          "page0770a_r30inv",
          "page0770b_r30inv2",
          "page1137a_undec-ca",
          "page1139a_pcpcounts",
          "page1140a_pcptree",
          "page1142a_sortComp",
          "page1144a2_TM2",
          "page1144a_TM1",
          "page1144b_beavers-1",
        ]
      },
      section09: {
        id: 9,
        name: "Implications for Mathematics and Its Foundations",
        c2cdata: [
          "page0773a_axioms1",
          "page0774a_axioms2",
          "page0775a_proof1",
          "page0775b_proofaxioms",
          "page0776a_mwproof1",
          "page0776b_mwproof1-rule",
          "page0777a_mwproofmw",
          "page0778a_shortstr-mw-1",
          "page0778b_shortstr-mw-2-rule",
          "page0780a_mwnegation",
          "page0781a_nandMW",
          "page0783a_mwconsist",
          "page0786a_UniversalDiophantine",
          "page0790a_diegallery1",
          "page0794a_caproof",
          "page0796a_mwthms-1",
          "page0798a_mwchoices",
          "page0802a_ruleRow",
          "page0804a_AxiomSearch1",
          "page0805a_AxiomSearch2",
          "page0806a_bfuns",
          "page0807a_bfequivs",
          "page0808a_nandAxioms",
          "page0809a_boolax2",
          "page0810a_wolframproof1",
          "page0811a_wolframproof2",
          "page0812a_pthms1",
          "page0813a_pthms2",
          "page0814a_kproofs-1",
          "page0814b_kproofs-2",
          "page0817a_aonthms1",
          "page0818a_nandthms1",
          "page1151a_wholeexpr",
          "page1154a_geoaxioms",
          "page1155a_nandproof",
          "page1155b_nandlemma",
          "page1157a_NandTautologyLenghts",
          "page1160a_peanoset",
          "page1163a_goodstein",
          "page1165a_mordell",
          "page1166a_nearbypowers",
          "page1173a_mwos-1",
          "page1173b_mwos-2",
          "page1173c_logictable",
          "page1174a_nandsearch",
          "page1174b_nandsearch2",
          "page1175a_stdaxthms",
          "page1176a_euclidnet",
        ]
      },
      section10: {
        id: 10,
        name: "Intelligence in the Universe",
        c2cdata: [
          "page0824a_selfrep",
          "page1186a_doublenote",
          "page1186b_unseq-2",
          "page1186c_unseq-3",
          "page1186d_unseq-4"
        ]
      }
    }
  },
]

export const colorMap = {
  pending: "orange",
  good: "#64aafa",
  approved: "#00b300",
  unapproved: "#000000",
  untouched: "#ff4d4d"
}

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const courseOutlineModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate a study material for exam for atom and molecule and level of difficulty will be moderate with summary of course, List of chapter along with summary for each chapter, topic list in each chapter, all result in JSON format\n\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseTitle": "Atoms and Molecules: A Moderate Level Study Guide",\n  "courseSummary": "This study guide covers the fundamental concepts of atoms and molecules, suitable for students seeking a moderate level of understanding. It delves into atomic structure, chemical bonding, molecular geometry, and basic nomenclature. The material aims to provide a solid foundation for further studies in chemistry.",\n  "chapters": [\n    {\n      "chapterNumber": 1,\n      "chapterTitle": "Introduction to Atomic Structure",\n      "chapterSummary": "This chapter lays the groundwork by exploring the basic building blocks of matter – atoms. It covers the subatomic particles (protons, neutrons, electrons), their properties, and how they contribute to an atom\'s identity and behavior. The chapter also introduces atomic number, mass number, isotopes, and basic atomic models.",\n      "topics": [\n        { "topicTitle": "Fundamental Particles", "details": ["Protons, neutrons, electrons", "Charges and masses", "Location within an atom"] },\n        { "topicTitle": "Atomic Number and Mass Number", "details": ["Definition of atomic number (Z)", "Definition of mass number (A)", "Calculating number of neutrons"] },\n         { "topicTitle": "Isotopes", "details": ["Definition of isotopes", "Representation of isotopes", "Average atomic mass"] },\n        { "topicTitle": "Basic Atomic Models", "details": ["Rutherford model", "Bohr model (brief overview)", "Limitations of early models"] }\n      ]\n    },\n     {\n      "chapterNumber": 2,\n      "chapterTitle": "Electrons in Atoms",\n      "chapterSummary": "This chapter focuses on the behavior of electrons within the atom. It explores concepts like energy levels, sublevels, orbitals, and electron configurations.  The chapter also introduces Hund\'s rule and Pauli\'s exclusion principle which are crucial for understanding how electrons fill atomic orbitals.",\n      "topics": [\n        { "topicTitle": "Energy Levels and Sublevels", "details": ["Principal energy levels (n)", "Sublevels (s, p, d, f)", "Relationship to atomic number"]},\n        { "topicTitle": "Atomic Orbitals", "details": ["Shapes of s, p, d orbitals", "Number of orbitals in each sublevel", "Spatial distribution of electrons"] },\n        { "topicTitle": "Electron Configuration", "details": ["Rules for filling orbitals (Aufbau principle)", "Writing electron configurations", "Abbreviated electron configurations", "Valence electrons and their role"]},\n         { "topicTitle": "Hund\'s Rule and Pauli\'s Exclusion Principle", "details":["Explanation and application of each rule", "Spin of electrons"] }\n      ]\n    },\n    {\n      "chapterNumber": 3,\n      "chapterTitle": "The Periodic Table",\n      "chapterSummary": "This chapter explores the organization and structure of the periodic table. It examines the trends in properties such as atomic size, ionization energy, and electronegativity, and how they relate to electron configurations. The understanding of how these trends vary across and down the periodic table provides the key insights into chemical behavior.",\n      "topics": [\n        { "topicTitle": "Organization of the Periodic Table", "details": ["Periods and groups/families", "Metals, nonmetals, metalloids", "Main group elements vs. transition metals"] },\n        { "topicTitle": "Periodic Trends", "details": ["Atomic size (atomic radius)", "Ionization energy", "Electronegativity", "Explanation of the trends based on atomic structure and effective nuclear charge"] },\n        { "topicTitle": "Predicting Properties", "details": ["Using periodic trends to predict properties of elements", "Applications of these trends in chemical understanding"]}\n      ]\n    },\n    {\n      "chapterNumber": 4,\n      "chapterTitle": "Chemical Bonding",\n      "chapterSummary": "This chapter introduces the fundamental concepts of chemical bonding. It discusses ionic, covalent, and metallic bonds, and explores their formation, properties, and characteristics. It will explore the concept of electronegativity to describe the polarity of bonds and molecules.",\n      "topics": [\n         { "topicTitle": "Types of Chemical Bonds", "details": ["Ionic bonds: formation, properties, and examples", "Covalent bonds: single, double, and triple bonds, properties, and examples", "Metallic bonds: characteristics and examples"] },\n         { "topicTitle": "Electronegativity and Bond Polarity", "details": ["Definition of electronegativity", "Predicting bond polarity using electronegativity differences", "Polar vs. nonpolar covalent bonds"] },\n        { "topicTitle": "Lewis Structures", "details": ["Drawing Lewis structures for simple molecules and polyatomic ions", "Resonance structures (basic concept)", "Formal charge"] },\n         { "topicTitle": "Exceptions to the Octet Rule", "details": ["Examples of molecules with less than or more than an octet of electrons"]\n          }\n      ]\n    },\n     {\n      "chapterNumber": 5,\n      "chapterTitle": "Molecular Geometry and Polarity",\n      "chapterSummary": "This chapter deals with the three-dimensional arrangement of atoms in molecules using the VSEPR theory. It explains how molecular shape affects molecular polarity and intermolecular forces and relate shape to macroscopic properties. It also focuses on identifying common molecular geometries and their bond angles.",\n      "topics": [\n        { "topicTitle": "VSEPR Theory", "details": ["Basic principles of VSEPR theory", "Electron group arrangement", "Predicting molecular shape"] },\n         { "topicTitle": "Common Molecular Geometries", "details": ["Linear, trigonal planar, tetrahedral, trigonal pyramidal, bent, trigonal bipyramidal and octahedral (brief overview)", "Bond angles associated with each geometry"] },\n        { "topicTitle": "Molecular Polarity", "details": ["Relationship between bond polarity and molecular shape", "Determining if a molecule is polar or nonpolar"] },\n        { "topicTitle": "Intermolecular Forces (Brief Overview)", "details": ["Introduction to dipole-dipole forces, hydrogen bonding, and London dispersion forces", "How polarity of molecule influences intermolecular forces"] }\n      ]\n    },\n     {\n      "chapterNumber": 6,\n      "chapterTitle": "Nomenclature of Inorganic Compounds",\n      "chapterSummary": "This chapter focuses on how to name inorganic compounds, including ionic compounds, covalent compounds, and acids. Students will learn the rules and conventions for naming binary compounds, compounds with polyatomic ions, and common acids.",\n        "topics": [\n          { "topicTitle": "Naming Ionic Compounds", "details":["Naming cations and anions", "Naming binary ionic compounds", "Naming ionic compounds with polyatomic ions", "Naming hydrates (brief introduction)"]},\n          { "topicTitle": "Naming Covalent Compounds", "details":["Naming binary covalent compounds using prefixes","Naming compounds with common names"]},\n          { "topicTitle": "Naming Acids", "details":["Naming binary acids", "Naming oxyacids"]}\n        ]\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

const result = await courseOutlineModel.sendMessage("INSERT_INPUT_HERE");
console.log(result.response.text());

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

export const generateNotesModel = model.startChat({
  generationConfig: {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  },
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate detailed exam material content for each chapter, ensuring all topic points are included in the content. Provide the content only in pure HTML format (do not use JSON, and do not include \'<html>\', \'<head>\', \'<body>\', or \'<title>\' tags). Output should be HTML only. Chapter:\n{\n  "chapterNumber": 2,\n  "chapterTitle": "Templates and Generic Programming",\n  "emoji": "⚙️",\n  "chapterSummary": "This chapter explores the power of templates to write generic code that works with various data types without modification. It will cover template metaprogramming and advanced template techniques.",\n  "topics": [\n    {\n      "topicTitle": "Function Templates",\n      "details": [\n        "Defining and using function templates",\n        "Template parameter deduction",\n        "Function template overloading",\n        "Non-type template parameters"\n      ]\n    },\n    {\n      "topicTitle": "Class Templates",\n      "details": [\n        "Defining and using class templates",\n        "Member functions in class templates",\n        "Class template instantiation",\n        "Static members in class templates"\n      ]\n    },\n    {\n      "topicTitle": "Template Specialization",\n      "details": [\n        "Partial template specialization",\n        "Full template specialization",\n        "Using specialization to handle specific types",\n        "Examples of template specialization"\n      ]\n    },\n    {\n      "topicTitle": "Template Metaprogramming",\n      "details": [\n        "Compile-time computations using templates",\n        "Type manipulation techniques",\n        "Conditional compilation with templates",\n        "Examples of metaprogramming techniques"\n      ]\n    },\n    {\n      "topicTitle": "Variadic Templates",\n      "details": [\n        "Defining and using variadic function templates",\n        "Variadic class templates",\n        "Parameter packs",\n        "Forwarding parameter packs"\n      ]\n    },\n    {\n      "topicTitle": "Type Traits",\n      "details": [\n        "Using type traits for compile-time type checking",\n        "Common type traits",\n        "Conditional compilation with type traits",\n        "Creating custom type traits"\n      ]\n    }\n  ]\n}',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: "    <article>\n      <h2>Chapter 2: Templates and Generic Programming ⚙️</h2>\n      <p>This chapter explores the power of templates to write generic code that works with various data types without modification. It will cover template metaprogramming and advanced template techniques.</p>\n    </article>\n\n    <section>\n      <h3>Function Templates</h3>\n      <ul>\n        <li><strong>Defining and using function templates</strong>\n          <p>Write a function template that swaps two variables of any type. Explain how to call this template with different data types. Provide code examples.</p>\n          <p>What is the difference between a regular function and a function template?</p>\n          <p>Describe the syntax for defining a function template. What is a template parameter?</p>\n        </li>\n        <li><strong>Template parameter deduction</strong>\n          <p>Explain how the compiler deduces template arguments when a function template is called. Provide examples.</p>\n           <p>What are the limitations of template parameter deduction? How can explicit template arguments solve these limitations?</p>\n        </li>\n        <li><strong>Function template overloading</strong>\n           <p>Explain how to overload function templates. Provide an example where a function template and a regular function are overloaded. Explain which version is called.</p>\n            <p>What are the rules for function template overloading resolution?</p>\n        </li>\n        <li><strong>Non-type template parameters</strong>\n           <p>Define a function template using non-type template parameters (e.g., an integer or a boolean). Give an example on how this would be used.</p>\n           <p>What are the restrictions on non-type template parameters? Give examples of legal and illegal non-type parameters.</p>\n        </li>\n      </ul>\n    </section>\n\n    <section>\n      <h3>Class Templates</h3>\n      <ul>\n        <li><strong>Defining and using class templates</strong>\n           <p>Define a simple class template, such as a generic pair class, and show how to use it with different data types. Include code examples.</p>\n           <p>Explain how class templates differ from regular classes. Why are class templates important?</p>\n        </li>\n        <li><strong>Member functions in class templates</strong>\n           <p>Explain how to define member functions within a class template. Show an example with implementation of the function outside the class definition.</p>\n           <p>Explain implicit vs explicit instantiation with regard to member functions in class templates.</p>\n        </li>\n        <li><strong>Class template instantiation</strong>\n           <p>Describe how class templates are instantiated. Discuss implicit and explicit instantiation.</p>\n           <p>What is the difference between a class template and a concrete class? When is the code for a class template generated?</p>\n        </li>\n        <li><strong>Static members in class templates</strong>\n          <p>Explain how to use static members in class templates. Provide an example and explain how they are shared across different instantiations.</p>\n          <p>Are static member variables shared across all instantiations of a class template or are they per-type instantiation?</p>\n        </li>\n      </ul>\n    </section>\n\n    <section>\n      <h3>Template Specialization</h3>\n      <ul>\n        <li><strong>Partial template specialization</strong>\n            <p>Explain what is partial template specialization, how it is different from full template specialization, and when to use it. Provide a code example.</p>\n           <p>What are the rules for partial template specialization? What types of patterns can be specialized?</p>\n        </li>\n        <li><strong>Full template specialization</strong>\n            <p>Define full template specialization and give an example where a specific version of a function template or class template is created for a particular type. </p>\n            <p>When should you use full template specialization?</p>\n        </li>\n         <li><strong>Using specialization to handle specific types</strong>\n           <p>Explain how template specialization allows you to provide different behavior for specific types when using a generic template. Provide an example.</p>\n            <p>Give an example where template specialization would significantly improve performance.</p>\n        </li>\n        <li><strong>Examples of template specialization</strong>\n          <p>Provide several use case examples where both partial and full template specialization are used. Explain why specialization is necessary in these cases.</p>\n          <p>Show an example of template specialization with a class and a function.</p>\n        </li>\n      </ul>\n    </section>\n\n    <section>\n      <h3>Template Metaprogramming</h3>\n      <ul>\n        <li><strong>Compile-time computations using templates</strong>\n           <p>Explain how templates can be used for performing computations at compile time. Give an example of factorial using template metaprogramming.</p>\n            <p>What are the benefits of doing computations at compile time compared to run time?</p>\n        </li>\n        <li><strong>Type manipulation techniques</strong>\n          <p>Describe how templates can be used to manipulate types at compile time. Provide an example of type deduction or transformation using type traits within a template.</p>\n            <p>Explain SFINAE (Substitution Failure Is Not An Error) with examples.</p>\n        </li>\n        <li><strong>Conditional compilation with templates</strong>\n            <p>Show an example of how to perform conditional compilation based on template parameters. For example, using std::enable_if or std::conditional.</p>\n             <p>Why would you need conditional compilation with templates?</p>\n        </li>\n        <li><strong>Examples of metaprogramming techniques</strong>\n           <p>Provide complex metaprogramming examples including type traits manipulation, compile-time assertions, and compile time constant generation.</p>\n           <p>Implement a compile-time power function using template metaprogramming.</p>\n        </li>\n      </ul>\n    </section>\n\n    <section>\n      <h3>Variadic Templates</h3>\n      <ul>\n        <li><strong>Defining and using variadic function templates</strong>\n            <p>Explain how to define function templates that accept a variable number of template arguments using variadic templates and show its implementation.</p>\n            <p>What is a parameter pack in variadic templates?</p>\n        </li>\n        <li><strong>Variadic class templates</strong>\n            <p>Show an example of a variadic class template that can be instantiated with different numbers of template parameters.</p>\n            <p>How are variadic class templates similar to and different from variadic function templates?</p>\n        </li>\n        <li><strong>Parameter packs</strong>\n            <p>Explain what parameter packs are and how to use them with variadic templates and provide examples of expanding them.</p>\n            <p>How does expanding parameter packs relate to recursion in variadic template functions?</p>\n        </li>\n        <li><strong>Forwarding parameter packs</strong>\n          <p>Explain how to forward parameter packs to another function. Show an example using perfect forwarding.</p>\n          <p>What is the purpose of std::forward in forwarding parameter packs?</p>\n        </li>\n      </ul>\n    </section>\n\n     <section>\n      <h3>Type Traits</h3>\n      <ul>\n        <li><strong>Using type traits for compile-time type checking</strong>\n             <p>Explain how type traits can be used to check type properties at compile time. Give examples of using std::is_integral, std::is_pointer, etc.</p>\n             <p>Why are type traits used to check properties at compile time and not during run-time?</p>\n        </li>\n        <li><strong>Common type traits</strong>\n            <p>Discuss various common type traits provided by the standard library (e.g. std::is_same, std::is_class, std::remove_const, etc.).</p>\n            <p>Explain the usage and difference of the following type traits: std::is_lvalue_reference, std::is_rvalue_reference and std::is_reference.</p>\n        </li>\n        <li><strong>Conditional compilation with type traits</strong>\n             <p>Show examples of how to use type traits to conditionally compile code using constructs like std::enable_if and std::conditional based on type properties.</p>\n             <p>Describe a practical scenario where conditional compilation based on type traits would be essential.</p>\n        </li>\n        <li><strong>Creating custom type traits</strong>\n            <p>Describe the process of creating a custom type trait. Show an example with a user-defined type trait.</p>\n            <p>When would you need to implement your own custom type traits?</p>\n        </li>\n      </ul>\n    </section>\n",
        },
      ],
    },
  ],
});

export const generateStudyTypeContentModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate the flashcard on topic: Functional Programming in JavaScript, Asynchronous JavaScript & Promises, Deep Dive into Prototypes and Inheritance in JSON format with front back content. maximum 15",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "flashcards": [\n    {\n      "front": "What are the core principles of functional programming?",\n      "back": "Immutability, Pure Functions, First-class functions, and Avoidance of side effects"\n    },\n    {\n      "front": "Define a pure function.",\n      "back": "A function that always returns the same output for the same input and has no side effects."\n    },\n     {\n      "front": "What are higher-order functions in JavaScript?",\n      "back": "Functions that either accept functions as arguments or return functions."\n    },\n     {\n      "front": "What is asynchronous JavaScript?",\n      "back": "JavaScript code that allows operations to be started and continue running without blocking the main thread"\n    },\n    {\n      "front": "What is a Promise in JavaScript?",\n      "back": "An object that represents the eventual completion (or failure) of an asynchronous operation."\n    },\n    {\n       "front": "What are the three states of a Promise?",\n       "back": "Pending, Fulfilled (Resolved), Rejected"\n    },\n        {\n      "front": "How do you handle a fulfilled Promise?",\n      "back": "Using the `.then()` method, which takes a callback function as an argument."\n    },\n    {\n      "front": "How do you handle a rejected Promise?",\n      "back": "Using the `.catch()` method, which takes a callback function as an argument."\n    },\n        {\n        "front":"What is the purpose of `.finally()` in Promises?",\n        "back": "To execute code regardless of whether the Promise was fulfilled or rejected. Used for cleanup actions."\n     },\n      {\n      "front": "What is a JavaScript prototype?",\n      "back": "A mechanism for objects to inherit properties and methods from another object"\n      },\n      {\n        "front": "How can you create a new object with a specific prototype?",\n        "back": "Using `Object.create(prototypeObject)`"\n      },\n     {\n       "front": "Explain the difference between prototype inheritance and classical inheritance.",\n      "back": "Prototype inheritance uses prototype chains to share properties. Classical uses classes"\n    },\n     {\n      "front": "What is the `__proto__` property in JavaScript?",\n      "back": "It is a deprecated way to access the internal prototype of an object. Use `Object.getPrototypeOf()` instead."\n     },\n      {\n      "front": "What is the purpose of `Object.getPrototypeOf()` in JavaScript?",\n      "back": "To get the prototype of an object."\n      },\n     {\n       "front": "Explain the concept of Prototypal Inheritance in JS.",\n       "back":"An object inherits properties and methods from its prototype object"\n     }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

export const generateQuizModel = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate quiz on topic: Flutter fundamentals, User Interface development, Basic app navigation with question and options along with correct answers in JSON format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "quizTitle": "Flutter Fundamentals: UI & Navigation",\n  "questions": [\n    {\n      "question": "What is Flutter primarily used for?",\n      "options": [\n        "Backend development",\n        "Creating native mobile applications",\n        "Creating only web applications",\n        "Machine learning models"\n      ],\n      "correctAnswer": "Creating native mobile applications"\n    },\n    {\n      "question": "Which programming language is used to build Flutter applications?",\n      "options": [\n        "Java",\n        "Kotlin",\n        "Dart",\n        "Swift"\n      ],\n      "correctAnswer": "Dart"\n    },\n    {\n       "question": "What is a \'Widget\' in Flutter?",\n       "options": [\n         "A server-side component",\n         "A tool for database management",\n         "A user interface element",\n         "A type of network protocol"\n       ],\n       "correctAnswer": "A user interface element"\n    },\n    {\n      "question": "Which widget is used to display an image in Flutter?",\n      "options": [\n        "Text",\n        "Icon",\n        "Image",\n        "Container"\n      ],\n      "correctAnswer": "Image"\n    },\n    {\n      "question": "What does the `Scaffold` widget provide?",\n      "options": [\n        "A basic layout structure for most screens with components like AppBar, Drawer, etc.",\n        "A way to perform background tasks",\n        "A way to manage user sessions",\n        "A widget for custom drawing"\n      ],\n       "correctAnswer": "A basic layout structure for most screens with components like AppBar, Drawer, etc."\n    },\n    {\n        "question": "Which widget is used to arrange child widgets in a row?",\n        "options": [\n          "Column",\n          "Row",\n          "Stack",\n          "ListView"\n        ],\n        "correctAnswer": "Row"\n    },\n     {\n       "question": "Which widget is used to arrange child widgets in a column?",\n        "options": [\n          "Row",\n          "Stack",\n          "Column",\n          "GridView"\n        ],\n       "correctAnswer": "Column"\n     },\n     {\n       "question": "What does the `Navigator` widget primarily handle in Flutter?",\n       "options": [\n         "Database transactions",\n         "Image processing",\n          "Screen transitions and navigation",\n          "Sound effects"\n        ],\n       "correctAnswer": "Screen transitions and navigation"\n     },\n    {\n      "question": "What is the purpose of `MaterialApp`?",\n      "options": [\n          "It\'s used for creating custom animations.",\n          "It’s the entry point for applications using Material Design.",\n          "It’s a widget for handling complex calculations.",\n          "It\'s a widget used for managing API calls."\n        ],\n        "correctAnswer": "It’s the entry point for applications using Material Design."\n    },\n    {\n        "question": "Which method is commonly used to navigate to a new screen in Flutter?",\n        "options": [\n            "push",\n            "pop",\n            "replace",\n            "all of the above"\n        ],\n        "correctAnswer": "all of the above"\n    }\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

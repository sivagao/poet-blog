{{{
  "title" : "API Design Goals: Intuitive APIs",
  "tags" : [ "api design" ],
  "category" : "api design",
  "date" : "4-25-2013",
  "description" : "Overview of some API design goals of creating a good, intuitive, usable API."
}}}

Here at Mozilla, we're currently designing an interface to Firefox's [Places API](https://developer.mozilla.org/en-US/docs/Places) for the [Jetpack API](https://developer.mozilla.org/en-US/docs/Jetpack). This feature has got me thinking about what qualities make a *good API*. An interface should enhance, never hinder, and so, to distill this thought into crude words, we want to provide the most **intuitive** and **flexible** interface possible to our add-on developers. From our perspective, we also want our features to be **maintainable**. While these terms may sound like buzzwords, they provide a standard and verifiable vocabulary for discussing API design, allowing us to ignore arguments of object-oriented versus functional, inheritence versus composition, emacs versus vim, and the like, as these are all building blocks to achieve the goal of a *good API*. A means to an end.

Let's start by defining what makes an API **intuitive**. We can take a closer look at **flexibility** and **maintainability** in future posts.

## The Interface

In the weeks before I joined Mozilla's Addon-SDK team, friends and family often asked about the king of work we do here. This meant I had to explain what an API is, to an audience of non-programmers. The best metaphor I could come up with is an arcade cabinet. We make the buttons and joysticks (API) that interfaces with the arcade guts (Firefox) so that developers (the players) can just play without having to understand how the cabinet guts work. Some libraries are [small utility modules](https://github.com/substack/camelize) that just expose one method (Pac Man), and then there are [giant libraries](https://github.com/mrdoob/three.js/) that require a huge surface area due to complexity (flight simulators). The main point is that joysticks are used in arcade machines because they're intuitive.

Now, buckle up -- this metaphor is useful for interface designers as well.

<img src="/img/posts/flight-simulator.jpg" alt="Flight Simulator" class="center" />
<p class="caption">This is what picking up [three.js](http://threejs.org/) felt like. Great API, but still a complex domain!</p>

## Consistency -> Intuitive

An API that's intuitive just works how one would expect it to. If a developer can glance over some documentation and begin with some trial and error, that's a good start. An intuitive API is a desirable goal since it means the users spend less time learning and more time doing. We can go up to most arcade machines and figure out *what is up*. Hit some buttons, move around the joystick, learn from visual feedback. We have this knowledge because we've interfaced with buttons and similar controllers before. That's the goal of an API: for a developer to spend a few minutes assessing the lay of the land, only to realize it feels pleasantly familiar. Ultimately, the API becomes a part of a developer's toolbelt, not dissimilar to standard libraries. They know how the joystick and buttons work.

**If users of the library do the equivilent of putting the joystick and buttons in their mouths, you're doing something wrong.**

<img src="/img/posts/small-arcade-machine.jpeg" alt="Man screaming at arcade machine" class="center" />
<p class="caption">This is the face you should make when designing APIs.</p>

Simple libraries, like most [components](https://github.com/component/component/wiki/Components) or [Substack-style npm modules](https://npmjs.org/~substack), can achieve an intuitive interface with a small surface area, doing one thing and one thing well. Libraries like [underscore](http://underscorejs.org/) is just a collection of small modular utilities exposed under a single namespace resulting in a clean, intuitive interface. Larger libraries require a bit more finesse, and leveraging what knowledge you assume the user has deep in their brain already. This is your flight simulator.

Consistency leads to an intuitive design. Designers can create consistency by tapping into users' existing knowledge.

**Design for the environment**. Use existing language and platform idioms -- in JavaScript, using `camelCase` versus `snake_case`. Your [node.js](http://nodejs.org) module better be asynchronous and your callbacks should follow the idiomatic node callback signature with an `error` in first position. Your [jQuery](http://jquery.com) plugin better return `this` and be chainable. When designing APIs for Jetpack, we think about how they can be similar to other modules in the SDK.

**Design for the audience**. jQuery uses CSS selectors for creating jQuery objects and has become a popular gateway into JavaScript from HTML/CSS. [John Resig](http://ejohn.org/) took the knowledge front-end developers already had (selectors) and applied it to a new world for the same audience.

**Design for the library itself**. Be consistent throughout your own library. If a method is named `getProp`, don't name the setter `setProperty`. Mostly semantic, use the same naming conventions, rules, abbreviations and limitations throughout the library. Naming is an artistic balance between clarity and not having [monster method names](http://stackoverflow.com/a/3670922).

These are just three examples of sources of knowledge that can inspire a designer when striving for consistency, and there are countless more areas of shared knowledge waiting to be leveraged.

## Chai's BDD

[Chai's BDD API](http://chaijs.com/api/bdd/) is an API I really dig as an intuitive assertion library. Many chainable methods solely for the sake of legibility, and every comparison you could possibly want *just exists*. It has a consistent pattern used which is an `expect` call, followed by chainable 'language' properties, ending in an assertion.

An example of Chai's BDD "noun-chain-assertion" pattern:

<pre>
expect([1,2,3]).to.include(2);
expect(15).to.be.equal(15);
</pre>

Chainable words can also set flags for the final assertion, keeping consistent with Chai's pattern:

<pre>
// Chain modifiers for negation (not)
expect('hello').to.not.be.a('number');
// Modifiers for subsequent comparisons (deep)
expect(foo).to.deep.equal({ bar: 'bar' });
</pre>

What I find most interesting about Chai's API is what inspired the interface. Mimicking Ruby testing libraries like [rspec](http://rubydoc.info/gems/rspec-expectations/frames) moreso than other JS assertion libraries, a Rails developer may have an easier time picking it up. Above all, it leans on our knowledge of the english language. The *language chain* is a series of synonymous properties that are used to increase legibility of the form `to`, `be`, `have`, `is`, and other verbs and articles. As long as a developer knows atleast one chainable word, they can write tests. As they adopt more synonyms, their tests become closer to a sentence, making both the codebase and test output more semantic.

<pre>
// Works, but weird phrasing
expect(10).to.most(15);
// Better!
expect(10).to.be.at.most(15);
// This works but why would you ever
expect(10).is.that.and.have.with.of.at.most(15);
</pre>

Chai also has a [`should` BDD](http://chaijs.com/guide/styles/#should-section) interface, similar to that of `expect`, where `Object.prototype` is extended with the `should` property. Still follows the "noun-chain-assertion" pattern, just differs on how the noun is constructed.

<pre>
var x = [1,2,3];
x.should.have.length(3);
</pre>

## Go forth and harvest humanity's body of knowledge

Hopefully this will spark thinking of intuitive with regard to API design, and what sources of knowledge one can use to influence how a library is used. I imagine things will start to get really fun when [ES6 Proxies](http://wiki.ecmascript.org/doku.php?id=harmony:direct_proxies) are everywhere and we can safely implement Ruby's [method_missing](http://rubylearning.com/satishtalim/ruby_method_missing.html)  [in JavaScript](https://gist.github.com/paulmillr/1648257)<sup class="footnote">1</sup>. In future posts, I'll address both **flexibility** and **maintainability** in API design, and in the meantime dig through some of your favourite source code and docs and see if any of this applies.

What are some other API design goals and good examples of intuitive APIs? What other sources of knowledge can be used when designing them? Pac Man or flight simulators?

* <sup class="footnote">1</sup>`__noSuchMethod__` is currently [implemented in Spidermonkey](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/noSuchMethod), but is non-standard.


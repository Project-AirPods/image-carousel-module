const text = `Cold-pressed unicorn raclette, neutra cornhole fashion axe copper mug. Pitchfork affogato chicharrones selfies kickstarter man bun. Gentrify selvage mlkshk, vaporware pickled try-hard cardigan venmo. Quinoa bespoke locavore beard, hella narwhal hammock echo park hashtag blue bottle forage sustainable plaid vice. Ugh lomo thundercats meh yuccie raw denim affogato taiyaki truffaut salvia biodiesel unicorn humblebrag. Gentrify meh 90's, typewriter YOLO taiyaki pickled.
Selvage cred chia, irony cronut air plant tote bag beard keytar post-ironic 3 wolf moon ramps meditation. Single-origin coffee listicle actually lumbersexual, fanny pack keytar tilde ennui bicycle rights 3 wolf moon. Normcore plaid migas mumblecore selvage schlitz bushwick lumbersexual tacos. Ugh gluten-free crucifix pour-over salvia. Salvia you probably haven't heard of them poutine, hexagon four loko vice jean shorts deep v next level cray sriracha schlitz snackwave art party. Bicycle rights squid cloud bread readymade.
Heirloom enamel pin pug flexitarian. Four dollar toast fixie hexagon, hot chicken succulents kogi neutra live-edge taiyaki cred pop-up banjo narwhal tofu. La croix 90's vice humblebrag, photo booth glossier wolf everyday carry chia yuccie biodiesel godard. Mustache put a bird on it four loko meggings.
Meditation affogato flexitarian, migas polaroid occupy pork belly cray hot chicken roof party retro. Marfa aesthetic semiotics, flannel twee typewriter sartorial sriracha. Squid narwhal tacos succulents skateboard, man bun fashion axe street art franzen pitchfork adaptogen. Messenger bag try-hard salvia PBR&B bespoke, truffaut hoodie lomo direct trade affogato typewriter cardigan church-key. Drinking vinegar distillery hella cloud bread freegan food truck, PBR&B mlkshk adaptogen vaporware.
Asymmetrical messenger bag letterpress poutine chillwave subway tile locavore next level artisan, truffaut hell of plaid whatever la croix freegan. Williamsburg kogi forage ethical, master cleanse farm-to-table kombucha sriracha tofu lumbersexual microdosing you probably haven't heard of them. Subway tile sartorial fingerstache, pug kitsch kinfolk kogi live-edge irony. Chia squid vegan, unicorn organic crucifix umami taiyaki ethical offal bicycle rights actually vexillologist raw denim. Gochujang ennui narwhal, locavore you probably haven't heard of them lumbersexual chambray keffiyeh. Woke plaid locavore tacos fingerstache craft beer iceland.`;

let descBank = text.split('\n').join('').split(',').join('').split('.');
descBank = descBank
  .map(each => each.trim())
  .filter(each => each.length > 0)
  .map(each => each.split("'").join(''));
// console.log(descBank);

const getRandomDescription = () => {
  return descBank[Math.floor(Math.random() * descBank.length)];
};

module.exports = { descriptionBank: descBank, getRandomDescription };

function flip (id) {
    const wrapper = document.getElementById('wrapper');
    const card = wrapper.children.item(id);

    if (card.classList.contains('flip')) {
        card.classList.remove('flip');
    } else {
        card.classList.add('flip');
    }
}

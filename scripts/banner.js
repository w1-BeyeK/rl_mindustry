var isSet = false;
var totalBanners = 0;

function ban() {
    var allblocks = Vars.content.blocks();

    for (var i = 0; i < allblocks.size; i++) {
        var block = allblocks.get(i);
        if (block.toString().toLowerCase() === "copper-wall") {
            Vars.state.rules.bannedBlocks.add(block);
        }
    }
    isSet = true;
}

function tryUnban() {
    totalBanners--;

    if (totalBanners == 0) {
        var bannedblocks = Vars.content.blocks();
        for (var i = 0; i < bannedblocks.size; i++) {
            var block = bannedblocks.get(i);
            if (block.toString().toLowerCase() === "copper-wall") {
                Vars.state.rules.bannedBlocks.remove(block);
            }
        }
        isSet = false;
    }
}

const banner = extendContent(Block, "banner", {
    placed(tile) {
        if (totalBanners == 0) {
            ban();
        }
        totalBanners++
    },

    update() {
        if (!isSet) {
            ban();
        }
    },

    removed(tile) {
        tryUnban();
    }
}
);


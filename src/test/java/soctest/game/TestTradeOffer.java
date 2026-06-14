/**
 * Sammys-Settlers - An online multiplayer version of the game Settlers of Catan
 * This file Copyright (C) 2026 Jeremy D Monin <jeremy@nand.net>
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 3
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * The maintainer of this program can be reached at jsettlers@nand.net
 **/

package soctest.game;

import soc.game.SOCResourceSet;
import soc.game.SOCTradeOffer;

import org.junit.Test;
import static org.junit.Assert.*;

/**
 * Tests for {@link SOCTradeOffer}.
 * @since 2.7.00
 */
public class TestTradeOffer
{
    private static final SOCResourceSet GIVE = new SOCResourceSet(1, 0, 0, 0, 0, 0);
    private static final SOCResourceSet GET = new SOCResourceSet(0, 0, 1, 0, 0, 0);

    /**
     * Constructor should copy the {@code to} array, because {@code waitingReply}
     * is initialized from that original recipient list.
     */
    @Test
    public void constructorCopiesToArray()
    {
        boolean[] to = new boolean[]{false, true, false, true};
        SOCTradeOffer offer = new SOCTradeOffer("ga", 0, to, GIVE, GET);

        to[1] = false;
        to[2] = true;

        assertArrayEquals(new boolean[]{false, true, false, true}, offer.getTo());
        assertArrayEquals(new boolean[]{false, true, false, true}, offer.getWaitingReply());
    }

    /**
     * Since {@link SOCTradeOffer#equals(Object)} ignores reply status,
     * {@link SOCTradeOffer#hashCode()} must also ignore reply status.
     */
    @Test
    public void hashCodeIgnoresWaitingReplyLikeEquals()
    {
        SOCTradeOffer offer = new SOCTradeOffer
            ("ga", 0, new boolean[]{false, true, false, true}, GIVE, GET);
        SOCTradeOffer copy = new SOCTradeOffer(offer);

        offer.clearWaitingReplyFrom(1);

        assertEquals(copy, offer);
        assertEquals(copy.hashCode(), offer.hashCode());
    }

    /**
     * Different recipient array lengths should compare unequal, not throw.
     */
    @Test
    public void equalsHandlesDifferentToArrayLengths()
    {
        SOCTradeOffer offer = new SOCTradeOffer
            ("ga", 0, new boolean[]{false, true}, GIVE, GET);
        SOCTradeOffer differentLength = new SOCTradeOffer
            ("ga", 0, new boolean[]{false, true, false}, GIVE, GET);

        assertFalse(offer.equals(differentLength));
        assertFalse(differentLength.equals(offer));
    }
}

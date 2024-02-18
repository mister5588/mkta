import {
  useContract,
  useNFTs,
  useOwnedNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
} from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Container from "../components/Container/Container";
import ListingWrapper from "../components/ListingWrapper/ListingWrapper";
import NFTGrid from "../components/NFT/NFTGrid";
import Skeleton from "../components/Skeleton/Skeleton";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
} from "../const/contractAddresses";
import styles from "../styles/Buy.module.css";
import randomColor from "../util/randomColor";

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];

export default function Buy() {
  const router = useRouter();
  const [tab, setTab] = useState<"nfts" | "listings" | "auctions">("listings"); // Set "listings" as the default active tab

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useNFTs(nftCollection);

  const { data: directListings, isLoading: loadingDirects } =
    useValidDirectListings(marketplace, {
      seller: router.query.address as string,
    });

  return (
    <Container maxWidth="lg">
      <div className={styles.tabs}>
        <h3
          className={`${styles.tab} ${
            tab === "listings" ? styles.activeTab : ""
          }`}
          onClick={() => setTab("listings")}
        >
          Listed Xailiens 
        </h3>
      </div>
      <div
        className={`${tab === "listings" ? styles.activeTabContent : styles.tabContent}`}
      >
        {loadingDirects ? (
          <p>Loading...</p>
        ) : directListings && directListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          directListings?.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div>
    </Container>
  );
}

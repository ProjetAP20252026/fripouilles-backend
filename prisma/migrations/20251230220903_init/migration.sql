-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'PARENT', 'ASSISTANTE_MATERNELLE');

-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('GARCON', 'FILLE');

-- CreateEnum
CREATE TYPE "StatutContrat" AS ENUM ('ACTIF', 'SUSPENDU', 'TERMINE');

-- CreateEnum
CREATE TYPE "StatutValidation" AS ENUM ('EN_ATTENTE', 'VALIDE', 'REFUSE');

-- CreateEnum
CREATE TYPE "TypePublicAtelier" AS ENUM ('ENFANT', 'PARENT_UNIQUEMENT', 'ASSISTANTE_UNIQUEMENT', 'MIXTE');

-- CreateEnum
CREATE TYPE "TypeAccueilCreche" AS ENUM ('REGULIER', 'OCCASIONNEL');

-- CreateEnum
CREATE TYPE "StatutInscription" AS ENUM ('ACTIVE', 'SUSPENDUE', 'TERMINEE');

-- CreateEnum
CREATE TYPE "Humeur" AS ENUM ('JOYEUX', 'CALME', 'FATIGUE', 'GRINCHEUX', 'MALADE');

-- CreateEnum
CREATE TYPE "QualiteRepas" AS ENUM ('TOUT_MANGE', 'MOITIE', 'PEU_MANGE', 'RIEN_MANGE');

-- CreateEnum
CREATE TYPE "TypeSieste" AS ENUM ('MATIN', 'APRES_MIDI', 'MATIN_ET_APRES_MIDI', 'AUCUNE');

-- CreateEnum
CREATE TYPE "TypeActionModification" AS ENUM ('AJOUT', 'MODIFICATION', 'SUPPRESSION');

-- CreateTable
CREATE TABLE "utilisateur" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parent_profil" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "adresse" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "situationFamiliale" TEXT NOT NULL,
    "profession" TEXT,
    "employeur" TEXT,
    "numeroAllocataire" TEXT,
    "beneficiaireCAF" BOOLEAN NOT NULL DEFAULT false,
    "numeroCAF" TEXT,
    "contactUrgenceNom" TEXT NOT NULL,
    "contactUrgenceTel" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "parent_profil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assistante_profil" (
    "id" SERIAL NOT NULL,
    "utilisateurId" INTEGER NOT NULL,
    "numeroAgrement" TEXT NOT NULL,
    "dateObtentionAgrement" TIMESTAMP(3) NOT NULL,
    "agrementValide" BOOLEAN NOT NULL,
    "dateFinAgrement" TIMESTAMP(3),
    "capaciteAccueil" INTEGER NOT NULL,
    "adresse" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "disponibilites" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assistante_profil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enfant" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "sexe" "Sexe" NOT NULL,
    "allergies" TEXT,
    "remarquesMedicales" TEXT,
    "medecinTraitant" TEXT,
    "medecinTraitantTel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enfant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relation_parent_enfant" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "estResponsableLegal" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "relation_parent_enfant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "personne_autorisee" (
    "id" SERIAL NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "lienAvecEnfant" TEXT NOT NULL,
    "autorisationEcrite" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "personne_autorisee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contrat_garde" (
    "id" SERIAL NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "assistanteId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3),
    "statutContrat" "StatutContrat" NOT NULL,
    "tarifHoraireBrut" DOUBLE PRECISION NOT NULL,
    "nombreHeuresSemaine" DOUBLE PRECISION NOT NULL,
    "indemniteEntretien" DOUBLE PRECISION NOT NULL,
    "indemniteRepas" DOUBLE PRECISION NOT NULL,
    "indemniteKm" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contrat_garde_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suivi_garde_assistante" (
    "id" SERIAL NOT NULL,
    "assistanteId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "heureArriveeReelle" TIMESTAMP(3),
    "heureDepartReelle" TIMESTAMP(3),
    "repasFournis" INTEGER NOT NULL DEFAULT 0,
    "fraisDivers" DOUBLE PRECISION,
    "kilometresParcourus" DOUBLE PRECISION,
    "nombreEnfantsGarde" INTEGER NOT NULL,
    "statutValidation" "StatutValidation" NOT NULL DEFAULT 'EN_ATTENTE',
    "dateValidation" TIMESTAMP(3),
    "commentaireParent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suivi_garde_assistante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "paie" (
    "id" SERIAL NOT NULL,
    "contratGardeId" INTEGER NOT NULL,
    "mois" INTEGER NOT NULL,
    "annee" INTEGER NOT NULL,
    "nombreHeuresNormales" DOUBLE PRECISION NOT NULL,
    "nombreHeuresMajorees" DOUBLE PRECISION NOT NULL,
    "nombreJoursPresence" INTEGER NOT NULL,
    "nombreRepas" INTEGER NOT NULL,
    "montantIndemniteEntretien" DOUBLE PRECISION NOT NULL,
    "montantIndemniteRepas" DOUBLE PRECISION NOT NULL,
    "montantIndemniteKm" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "salaireBrutBase" DOUBLE PRECISION NOT NULL,
    "salaireNetAPayer" DOUBLE PRECISION NOT NULL,
    "chargesPatronales" DOUBLE PRECISION NOT NULL,
    "chargesSalariales" DOUBLE PRECISION NOT NULL,
    "dateEdition" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentaire" TEXT,

    CONSTRAINT "paie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suivi_journalier_enfant" (
    "id" SERIAL NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "assistanteId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "temperature" DOUBLE PRECISION,
    "humeur" "Humeur",
    "qualiteSommeil" TEXT,
    "siesteFaites" "TypeSieste",
    "appetit" "QualiteRepas",
    "contenuRepas" TEXT,
    "biberons" TEXT,
    "change" BOOLEAN NOT NULL DEFAULT true,
    "selles" BOOLEAN NOT NULL DEFAULT false,
    "soins" TEXT,
    "activites" TEXT,
    "remarques" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "suivi_journalier_enfant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historique_modification" (
    "id" SERIAL NOT NULL,
    "parentId" INTEGER NOT NULL,
    "suiviId" INTEGER NOT NULL,
    "dateAction" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentaire" TEXT,
    "typeAction" "TypeActionModification" NOT NULL,

    CONSTRAINT "historique_modification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "atelier" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "heureDebut" TIMESTAMP(3) NOT NULL,
    "heureFin" TIMESTAMP(3) NOT NULL,
    "nombrePlaces" INTEGER NOT NULL,
    "lieu" TEXT NOT NULL,
    "typePublic" "TypePublicAtelier" NOT NULL,
    "ageMinMois" INTEGER,
    "ageMaxMois" INTEGER,
    "animateurId" INTEGER,
    "dateLimiteInscription" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "atelier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inscription_atelier" (
    "id" SERIAL NOT NULL,
    "atelierId" INTEGER NOT NULL,
    "parentId" INTEGER,
    "enfantId" INTEGER,
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "present" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "inscription_atelier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "parametrage_creche" (
    "id" SERIAL NOT NULL,
    "jourSemaine" INTEGER NOT NULL,
    "heureOuverture" TIMESTAMP(3) NOT NULL,
    "heureFermeture" TIMESTAMP(3) NOT NULL,
    "tarifHoraire" DOUBLE PRECISION NOT NULL,
    "capaciteMax" INTEGER NOT NULL,

    CONSTRAINT "parametrage_creche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dossier_inscription_creche" (
    "id" SERIAL NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    "typeAccueil" "TypeAccueilCreche" NOT NULL,
    "joursReserves" TEXT,
    "dateDebut" TIMESTAMP(3) NOT NULL,
    "dateFin" TIMESTAMP(3),
    "statutDossier" "StatutInscription" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dossier_inscription_creche_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation_creche" (
    "id" SERIAL NOT NULL,
    "enfantId" INTEGER NOT NULL,
    "parentId" INTEGER NOT NULL,
    "dateReservation" TIMESTAMP(3) NOT NULL,
    "heureArrivee" TIMESTAMP(3) NOT NULL,
    "heureDepart" TIMESTAMP(3) NOT NULL,
    "statut" "StatutValidation" NOT NULL DEFAULT 'EN_ATTENTE',
    "facture" BOOLEAN NOT NULL DEFAULT false,
    "montant" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservation_creche_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "utilisateur_email_key" ON "utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "parent_profil_utilisateurId_key" ON "parent_profil"("utilisateurId");

-- CreateIndex
CREATE UNIQUE INDEX "assistante_profil_utilisateurId_key" ON "assistante_profil"("utilisateurId");

-- CreateIndex
CREATE UNIQUE INDEX "assistante_profil_numeroAgrement_key" ON "assistante_profil"("numeroAgrement");

-- CreateIndex
CREATE UNIQUE INDEX "relation_parent_enfant_parentId_enfantId_key" ON "relation_parent_enfant"("parentId", "enfantId");

-- CreateIndex
CREATE UNIQUE INDEX "contrat_garde_enfantId_assistanteId_parentId_key" ON "contrat_garde"("enfantId", "assistanteId", "parentId");

-- CreateIndex
CREATE UNIQUE INDEX "suivi_garde_assistante_assistanteId_date_key" ON "suivi_garde_assistante"("assistanteId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "paie_contratGardeId_mois_annee_key" ON "paie"("contratGardeId", "mois", "annee");

-- CreateIndex
CREATE UNIQUE INDEX "suivi_journalier_enfant_enfantId_assistanteId_date_key" ON "suivi_journalier_enfant"("enfantId", "assistanteId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "dossier_inscription_creche_enfantId_key" ON "dossier_inscription_creche"("enfantId");

-- AddForeignKey
ALTER TABLE "parent_profil" ADD CONSTRAINT "parent_profil_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistante_profil" ADD CONSTRAINT "assistante_profil_utilisateurId_fkey" FOREIGN KEY ("utilisateurId") REFERENCES "utilisateur"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relation_parent_enfant" ADD CONSTRAINT "relation_parent_enfant_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent_profil"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relation_parent_enfant" ADD CONSTRAINT "relation_parent_enfant_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "enfant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "personne_autorisee" ADD CONSTRAINT "personne_autorisee_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "enfant"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrat_garde" ADD CONSTRAINT "contrat_garde_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "enfant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrat_garde" ADD CONSTRAINT "contrat_garde_assistanteId_fkey" FOREIGN KEY ("assistanteId") REFERENCES "assistante_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contrat_garde" ADD CONSTRAINT "contrat_garde_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suivi_garde_assistante" ADD CONSTRAINT "suivi_garde_assistante_assistanteId_fkey" FOREIGN KEY ("assistanteId") REFERENCES "assistante_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "paie" ADD CONSTRAINT "paie_contratGardeId_fkey" FOREIGN KEY ("contratGardeId") REFERENCES "contrat_garde"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suivi_journalier_enfant" ADD CONSTRAINT "suivi_journalier_enfant_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "enfant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "suivi_journalier_enfant" ADD CONSTRAINT "suivi_journalier_enfant_assistanteId_fkey" FOREIGN KEY ("assistanteId") REFERENCES "assistante_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historique_modification" ADD CONSTRAINT "historique_modification_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historique_modification" ADD CONSTRAINT "historique_modification_suiviId_fkey" FOREIGN KEY ("suiviId") REFERENCES "suivi_journalier_enfant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "atelier" ADD CONSTRAINT "atelier_animateurId_fkey" FOREIGN KEY ("animateurId") REFERENCES "assistante_profil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription_atelier" ADD CONSTRAINT "inscription_atelier_atelierId_fkey" FOREIGN KEY ("atelierId") REFERENCES "atelier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription_atelier" ADD CONSTRAINT "inscription_atelier_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent_profil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inscription_atelier" ADD CONSTRAINT "inscription_atelier_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "enfant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dossier_inscription_creche" ADD CONSTRAINT "dossier_inscription_creche_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "enfant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dossier_inscription_creche" ADD CONSTRAINT "dossier_inscription_creche_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_creche" ADD CONSTRAINT "reservation_creche_enfantId_fkey" FOREIGN KEY ("enfantId") REFERENCES "enfant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation_creche" ADD CONSTRAINT "reservation_creche_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "parent_profil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

![@observerly:perseus](https://user-images.githubusercontent.com/84131395/173381911-b9d8641a-548a-49ca-8b73-052535d708ef.jpg)

The on-demand, on-the-edge API of stars, galaxies and other astronomical bodies.

---

## Guide

All astronomical bodies in the Perseus API are represented by a **`Body`** object. Each body has a **`type`**.

The types match those from the SIMBAD Astronomical Database [http://simbad.u-strasbg.fr/simbad/](http://simbad.u-strasbg.fr/simbad/).

- \*: Star
- \*\*: Double star
- \*Ass: Association of stars
- OCl: Open Cluster
- GCl: Globular Cluster
- Cl+N: Star cluster + Nebula
- G: Galaxy
- GPair: Galaxy Pair
- GTrpl: Galaxy Triplet
- GGroup: Group of galaxies
- PN: Planetary Nebula
- HII: HII Ionized region
- DrkN: Dark Nebula
- EmN: Emission Nebula
- Neb: Nebula
- RfN: Reflection Nebula
- SNR: Supernova remnant
- Nova: Nova star
- NonEx: Nonexistent object
- Dup: Duplicated object (see NGC or IC columns to find the master object)
- Other: Other classification (see object notes)

Every body, regardless of type, will have an **`ra`**, Right Ascension (quoted in either in J2000 Epoch (HH:MM:SS.SS), hours, or in degrees), and **`dec`**, declincation (quoted in J2000 Epoch (+/-DD:MM:SS.SS) (in degrees) or in degrees).

Every body, regardless of type, will have a **`constellation`**, which is calculated from the **`ra`** and **`dec`**, using a algorithmic lookup technique pioneered by Nancy Roman.

---

## API Development

### Project Requirements

- [Python](https://www.python.org/) 3.11.*
- [Docker](https://www.docker.com/).
- [Docker Compose](https://docs.docker.com/compose/install/).
- [Poetry](https://python-poetry.org/) for Python package and environment management.

### Installing Dependencies

The Perseus project manages Python package dependencies using [Poetry](https://python-poetry.org/). You'll need to follow the instructions for installation there.

Then you can start a shell session with the new environment with:

```console
$ poetry shell
```

**N.B.** For development with vscode you will need to run the following command:

```console
$ poetry config virtualenvs.in-project true
```

This will installed the poetry `.venv` in the root of the project and allow vscode to setup the environment correctly for development.

To start development, install all of the dependencies as:

```console
$ poetry install
```

**N.B.** _Ensure that any dependency changes are committed to source control, so everyone has a consistenct package dependecy list._

### Local Development

Before starting local develoment, you'll need to have mkcert installed on your machine or your VM.

Follow the installation structions for your OS here [mkcert](https://github.com/FiloSottile/mkcert), and then run the following command:

```
mkcert -install
```

Once `mkcert` is installed, you'll need to provision a local private key and certificate:

```
mkcert -cert-file certs/local-cert.pem -key-file certs/local-key.pem "perseus.local.observerly.com traefik.local.observerly.com"
```

The Perseus development stack can be built with the following `docker` `compose` command, with the `$INSTALL_DEV` build environment argument\*.

```console
$ docker compose -f local.yml build --build-arg INSTALL_DEV="true"
```

\*This builds the `poetry` initialised python environment with development dependencies (such as pytest) installed.

The Perseus development stack can then be started with:

```console
$ docker compose -f local.yml up"
```

If you need a shell inside the running api container, e.g., to run pytest, you can use the following command:

```console
$ docker compose -f local.yml exec api bash
```

### Traefik HTTPS Proxy

By default, this project is served over https, simply navigate to the follow address on your localhost:

```
perseus.docker.localhost:8001
```

### Alembic Migrations

The Perseus project utilises the database toolkit SQLAlchemy and the database migration tool Alembic. Alembic is hosted on GitHub at [https://github.com/sqlalchemy/alembic](https://github.com/sqlalchemy/alembic) under the SQLAlchemy organization.

The most recent published version of the Alembic documentation should be at https://alembic.sqlalchemy.org.

As during local development your app directory is mounted as a volume inside the container, you can also run the migrations with `alembic` commands inside the container and the migration code will be in your app directory (instead of being only inside the container). So you can add it to your git repository.

Make sure you create a "revision" of your models and that you "upgrade" your database with that revision every time you change them. As this is what will update the tables in your database. Otherwise, your application will have errors.

The process for changes to, or additions of, any models associated with this project is as follows:

- Start an interactive shell session in the api container:

```console
$ docker compose -f local.yml exec api bash
```

- If you created a new model in `.app/models/`, make sure to import it in `.app/db/base.py`, that Python module (`base.py`) that imports all the models will be used by Alembic.

- After changing a model (for example, adding a column), inside the container, create a revision, e.g.:

```console
$ alembic revision --autogenerate -m "feat: Added Body model (e.g., Star, Galaxy, Nebulae etc.)"
```

- Make sure to commit to the git repository the files generated in the alembic directory\*.

- After creating the revision, run the migration in the database (this is what will actually change the database schema):

```console
$ alembic upgrade head
```

**N.B.** _All Alembic model "revisions" (changes) should be committed to source control, so everyone has a consistent database schema history._

### Seeding API Data

Inside the data folder, there comes a number of files that can be used to seed the database before performing consistent tests.

To run the initial database seeding, you can use the following command:

```console
$ docker compose -f local.yml exec api ./scripts/init_db_seed.sh
```

This will run the seed scripts in the `scripts` directory, and will seed the database with the data in the `data` directory.

The initial data is a list of major, minor and peripheral stellar bodies as given in the HD-DM-GC-HR-HIP-Bayer-Flamsteed Cross Index (Kostjuk, 2002), which can be found in the VizieR catalogue database here: [VizieR-2](https://vizier.u-strasbg.fr/viz-bin/VizieR-2), and cross-referenced with the IAU list of approved star names (*as of January 1st, 2021), which can be found here: [https://www.iau.org/public/themes/naming_stars/](https://www.iau.org/public/themes/naming_stars/).

### Flushing API Data

To flush the database, you can use the following command:

```console
$ docker compose -f local.yml exec api ./scripts/init_db_flush.sh
```

This will run the flush scripts in the `scripts` directory, and will flush the database of all data.


### Running Tests

To run the tests, please ensure you have followed the steps for building the development server:

The Perseus development stack can be built with the following `docker` `compose` command, with the `$INSTALL_DEV` build environment argument\*.

```console
$ docker compose -f local.yml build --build-arg INSTALL_DEV="true"
```

You'll need to ensure that you have also run any migrations you'll need, as well as seed the data:

```console
$ docker compose -f local.yml exec api alembic upgrade head
```

```console
$ docker compose -f local.yml exec api ./scripts/init_db_seed.sh
```

You can then run the pytest suite using the following command:

```
$ docker compose -f local.yml exec api pytest
```

---

## Acknowledgements

This research has made use of the VizieR catalogue access tool, CDS, Strasbourg, France (DOI : [10.26093/cds/vizier](https://vizier.cds.unistra.fr/)).

The original description of the VizieR service was published in 2000, A&AS 143, 23.

This research has made use of the IAU list of approved star names [https://www.iau.org/public/themes/naming_stars/](https://www.iau.org/public/themes/naming_stars/).


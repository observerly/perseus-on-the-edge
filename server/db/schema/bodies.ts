/*****************************************************************************************************************/

// @author         Michael Roberts <michael@observerly.com>
// @package        @observerly/perseus-on-the-edge
// @license        Copyright © 2021-2023 observerly

/*****************************************************************************************************************/

import { InferModel } from 'drizzle-orm'

import { sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core'

/*****************************************************************************************************************/

export const bodies = sqliteTable('bodies', {
  /**
   *
   *
   * Some unique identifier for the body.
   *
   */
  uid: text('uid').primaryKey(),
  /**
   *
   *
   * The common name of the body.
   *
   */
  name: text('name').notNull(),
  /**
   *
   *
   * The IAU Authoritative/Designated name for the body.
   *
   */
  iau: text('iau').notNull(),
  /**
   *
   *
   * Right ascension (abbreviated RA; symbol α)
   *
   * Right ascension is the angular distance of a
   * particular point measured eastward along the celestial equator from the
   * Sun at the March equinox to the (hour circle of the) point in question
   * above the earth.
   *
   *
   */
  ra: numeric('ra').notNull(),
  /**
   *
   *
   * Proper Motion in Right Ascension (mas/yr)
   *
   * The proper motion of a star is its observed angular change in position over
   * the course of a year on the celestial sphere. The components of proper
   * motion in the equatorial coordinate system are measured in
   * milli-arcseconds per year (mas/yr).
   *
   */
  μra: numeric('μra'),
  /**
   *
   * Declination (abbreviated dec; symbol δ)
   *
   * Declination is one of the two angles that locate a point on the celestial
   * sphere in the equatorial coordinate system, the other being hour angle.
   * Declination's angle is measured north or south of the celestial equator,
   * along the hour circle passing through the point in question
   *
   *
   */
  dec: numeric('dec').notNull(),
  /**
   *
   *
   * Proper Motion in Declination (mas/yr)
   *
   * The proper motion of a star is its observed angular change in position over
   * the course of a year on the celestial sphere. The components of proper
   * motion in the equatorial coordinate system are measured in
   * milli-arcseconds per year (mas/yr).
   *
   */
  μdec: numeric('μdec'),
  /**
   *
   *
   * The IAU designated constellation (e.g., Orion) in which the body is located.
   *
   *
   */
  constellation: text('constellation').notNull(),
  /**
   *
   *
   * The type of object, consult documentation for a list of types and their meaning.
   *
   */
  type: text('type', {
    enum: [
      '*',
      '**',
      '*Ass',
      'OCl',
      'GCl',
      'Cl+N',
      'G',
      'GPair',
      'GTrpl',
      'GGroup',
      'PN',
      'HII',
      'DrkN',
      'EmN',
      'Neb',
      'RfN',
      'SNR',
      'Nova',
      'NonEx',
      'Dup',
      'Other'
    ]
  }).notNull(),
  /**
   *
   * Apparent magnitude (m) is a measure of the brightness of an astronomical
   * object observed from Earth. An object's apparent magnitude depends on its
   * intrinsic luminosity, its distance from Earth, and any extinction of the
   * object's light caused by interstellar dust along the line of sight to
   * the observer.
   *
   */
  m: numeric('appm'),
  /**
   *
   *
   * Absolute magnitude (M) is a measure of the luminosity of a celestial object,
   * on an inverse logarithmic astronomical magnitude scale. An object's absolute
   * magnitude is defined to be equal to the apparent magnitude that the object
   * would have if it were viewed from a distance of exactly 10 parsecs (32.6
   * light-years) from the observer, without extinction (or dimming) of its
   * light due to absorption by interstellar matter and cosmic dust.
   *
   */
  M: numeric('absM'),
  /**
   *
   *
   * Distance to the star (in parsecs).
   *
   *
   */
  d: numeric('d'),
  /**
   *
   * Henry Draper Catalogue Number:
   *
   * The HD catalogue is named after Henry Draper, an amateur astronomer, and
   * covers the entire sky almost completely down to an apparent photographic
   * magnitude of about 9; the extensions added fainter stars in certain areas
   * of the sky.
   *
   */
  hd: text('hd'),
  /**
   *
   * Harvard Revised Catalogue Number
   *
   */
  hr: text('hr'),
  /**
   *
   * Hipparcos Catalogue Number
   *
   */
  hip: text('hip'),
  /**
   *
   * Durchmusterung Catalogue Number:
   * Durchmusterung or Bonner Durchmusterung (BD), is an astrometric star catalogue
   * of the whole sky, compiled by the Bonn Observatory in Germany from 1859 to 1903.
   *
   */
  bd: text('bd'),
  /**
   *
   *
   *     # A Flamsteed designation is a combination of a number and constellation
    # name that uniquely identifies most naked eye stars in the modern
    # constellations visible from southern England. They are named for
    # John Flamsteed who first used them while compiling his Historia
    # Coelestis Britannica. (Flamsteed used a telescope,[1] and the catalog
    #  also includes some stars which are relatively bright but not
    # necessarily visible with the naked eye.)
   *
   */
  flamsteed: text('flamsteed'),
  /**
   *
   *
   *     Messier Catalogue Number:
    The Messier objects are a set of 110 astronomical objects catalogued by
    the French astronomer Charles Messier in his Catalogue des Nébuleuses et
    des Amas d'Étoiles (Catalogue of Nebulae and Star Clusters). Because
    Messier was only interested in finding comets, he created a list of those
    non-comet objects that frustrated his hunt for them.
   *
   */
  messier: text('messier'),
  /**
   *
   *
   * NGC Catalogue Number: The New General Catalogue of Nebulae and Clusters of
   * Stars (abbreviated NGC) is an astronomical catalogue of deep-sky objects
   * compiled by John Louis Emil Dreyer in 1888. The NGC contains 7,840 objects,
   * including galaxies, star clusters and emission nebulae.
   *
   */
  ngc: text('ngc'),
  /**
   *
   *
   * Indexed Catalogues Number: Dreyer published two supplements to the NGC in
   * 1895 and 1908, known as the Index Catalogues (abbreviated IC), describing
   * a further 5,386 astronomical objects to NGC. Thousands of these objects are
   * best known by their NGC or IC numbers, which remain in widespread use.
   *
   */
  ic: text('ic'),
  /**
   *
   * The Body's eccentricity (unitless)
   *
   */
  e: numeric('e'),
  /**
   *
   * The Body's Semi-major axis (arcminutes).
   *
   */
  a: numeric('a'),
  /**
   *
   * The Body's Semi-minor axis (arcminutes).
   *
   */
  b: numeric('b'),
  /**
   *
   * The Body's inclination (degrees).
   *
   */
  i: numeric('i'),
  /**
   *
   * The body's redshift (unitless).
   *
   */
  z: numeric('z'),
  /**
   *
   * SIMBAD Search Query URL.
   *
   */
  simbad: text('simbad').notNull()
})

/*****************************************************************************************************************/

export type Body = InferModel<typeof bodies>

/*****************************************************************************************************************/
